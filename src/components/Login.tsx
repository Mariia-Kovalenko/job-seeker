import { useFormik } from "formik";
import { useState, useRef, useEffect } from "react";
import { EyeIcon } from "../icons/EyeIcon";
import { EyeSlashIcon } from "../icons/EyeSlashIcon";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/queries";
import Button from '../common/Button';
import { useUserStore } from "../store/userStore";
import { UserStore } from "../store/userStore";

export const Login = () => {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [login, { loading, error }] = useMutation(LOGIN);
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState<boolean>(false);

    const { setUser } = useUserStore();

    const handleDisplayPassword = () => {
        setShowPassword(!showPassword);
        if (passwordInputRef.current) {
            passwordInputRef.current.type = showPassword ? "password" : "text";
        }
    };

    const formik = useFormik({
        initialValues: { email: "", password: "" },
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
                console.log(values);
                const { data, error }: { data: any, error: any } = await login({ variables: values }) as { data: any, error: any };
                console.log(data);
                if (error) {
                    throw new Error(error.message);
                }
                const token = data.login.jwt_token;
                localStorage.setItem('token', token);
                setUser({ email: values.email, token: token });
                navigate('/jobs');
            } catch (error: any) {
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="w-full max-w-md mx-auto text-left px-4 py-6 min-h-[calc(100vh-64px)] flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <p className={`text-md font-medium ${theme == "dark" ? "text-white" : "text-gray-500"} mb-2`}>Sign in to your account</p>
            <div className={`text-sm ${theme == "dark" ? "text-white" : "text-gray-500"} mb-10`}>Do not have an account? <Link to="/register" className="text-primary underline hover:text-primary/90 transition-all duration-300">Register</Link></div>
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

                <Button loading={submitting} type="submit" fullWidthDesktop fullWidthMobile>Submit</Button>
            </form>
        </div>
    );
};