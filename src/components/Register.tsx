import { useFormik } from "formik";
import { useState, useRef } from "react";
import { EyeIcon } from "../icons/EyeIcon";
import { EyeSlashIcon } from "../icons/EyeSlashIcon";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import Button from '../common/Button';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const Register = () => {
    const { theme, toggleTheme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleDisplayPassword = () => {
        setShowPassword(!showPassword);
        if (passwordInputRef.current) {
            passwordInputRef.current.type = showPassword ? "password" : "text";
        }
    };

    const formik = useFormik({
        initialValues: { email: '', password: '', company: '' },
        validate: (values) => {
            const errors: any = {};
            if (!values.email) {
                errors.email = "Email is required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Password is required";
            } else if (values.password.length < 6) {
                errors.password = "Password must be at least 8 characters long";
            }
            return errors;
        },
        onSubmit: async (values) => {
            setSubmitting(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
            } finally {
                setSubmitting(false);
            }
        },
    });

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log("response", tokenResponse);
            const token = tokenResponse.access_token;
            console.log("token", token);

            const userInfo = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("userInfo", userInfo.data);
            const email = userInfo.data.email;
            console.log("email", email);
            if (!email) {
                throw new Error("Email not found");
            }
            // Navigate to a different page or handle the registration as needed
        },
        onError: () => {
            console.log("Login Failed");
        }
    });

    return (
        <div className="w-full max-w-md mx-auto text-left px-4 py-6 min-h-[calc(100vh-64px)] flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">Register</h1>
            <p className={`text-md font-medium ${theme == "dark" ? "text-white" : "text-gray-500"} mb-2`}>Create an account to get started</p>
            <div className={`text-sm ${theme == "dark" ? "text-white" : "text-gray-500"} mb-10`}>Already have an account? <Link to="/login" className="text-primary underline hover:text-primary/90 transition-all duration-300">Login</Link></div>
            <form
                onSubmit={formik.handleSubmit}
                className=" flex flex-col gap-6 items-start"
            >
                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="email">
                        Email *
                    </label>
                    <input
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 ${
                            formik.touched.password &&
                            formik.errors.password
                                ? "border-red-600"
                                : theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                    : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-xs text-red-600">
                            {formik.errors.email}
                        </div>
                    ) : null}
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="password">
                        Password *
                    </label>
                    <div className="relative w-full">
                        <input
                            ref={passwordInputRef}
                            className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 ${
                                formik.touched.password &&
                                formik.errors.password
                                    ? "border-red-600"
                                    : theme == "dark"
                                    ? "text-white bg-lightGrey border-gray-300"
                                    : "text-darkBackground bg-white border-lighterGrey"
                            }`}
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {/* eye icon to show/hide password */}
                        <button
                            type="button"
                            className="absolute  right-2 top-1/2 -translate-y-1/2"
                            onClick={handleDisplayPassword}
                        >
                            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                        </button>
                    </div>

                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-xs text-red-500">
                            {formik.errors.password}
                        </div>
                    ) : null}
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="company">
                        Company
                    </label>
                    <input
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 ${
                            theme == 'dark'
                            ? 'text-white bg-lightGrey border-gray-300'
                            : 'text-darkBackground bg-white border-lighterGrey'
                        }`}
                        id="company"
                        name="company"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.company}
                    />
                </fieldset>

                <Button loading={submitting} type="submit" fullWidthDesktop fullWidthMobile>Submit</Button>
            </form>
            {/* Google login section */}
            <div className="w-full flex flex-col gap-4 items-start mt-4">
                <div className="w-full flex gap-2 items-center justify-center">
                    {/* divider line */}
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="text-sm text-center w-[30%] opacity-50">
                        or
                    </div>
                    {/* divider line right */}
                    <div className="w-full h-[1px] bg-gray-300"></div>
                </div>
                <button
                    onClick={() => googleLogin()}
                    className="google-login-button w-full flex items-center justify-center gap-2 border-[1.3px] rounded-full h-12"
                >
                    <img
                        src="/google-logo.webp"
                        alt="Google Logo"
                        className="logo-icon w-6 h-6"
                    />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};
