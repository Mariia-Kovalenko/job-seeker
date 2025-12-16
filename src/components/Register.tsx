import { useFormik } from "formik";
import { useState, useRef } from "react";
import { EyeIcon } from "../icons/EyeIcon";
import { EyeSlashIcon } from "../icons/EyeSlashIcon";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import {
    GoogleLogin,
    useGoogleLogin,
    useGoogleOneTapLogin,
} from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "@apollo/client/react";
import { GOOGLE_REGISTER } from "../graphql/mutations";
import { useUserStore } from "../store/userStore";

export const Register = () => {
    const { theme, toggleTheme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [googleEmail, setGoogleEmail] = useState("");
    const [googleRegisterMutation, { loading, error }] = useMutation(GOOGLE_REGISTER);

    const { setUser } = useUserStore();

    const navigate = useNavigate();

    const handleDisplayPassword = () => {
        setShowPassword(!showPassword);
        if (passwordInputRef.current) {
            passwordInputRef.current.type = showPassword ? "password" : "text";
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log("tokenResponse", tokenResponse);
            const token = tokenResponse.access_token;
            const userInfo = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const email = userInfo.data.email;
            if (email) {
                setGoogleEmail(email);
                formik.setFieldValue("email", email);
            } else {
                throw new Error("Email not found");
            }
        },
        onError: () => {
            console.log("Login Failed");
        },
    });

    const loginSuccess = async (credentialResponse: any) => {
        console.log(credentialResponse);
        const token = credentialResponse.credential;
        console.log(token);

        // try {
        //     // send request to backend to verify user and get user info
        //     const { data, errors }: { data: any; errors: any } = (await googleRegisterMutation({ variables: { token: token } })) as { data: any; errors: any };
        //     console.log(data, errors);
        //     if (errors) {
        //         throw new Error(errors[0].message);
        //     }
        //     const { email, newToken } = data.googleRegister;
        //     setUser({ email: email, token: newToken });
        // } catch (err: any) {
        //     // Handle the error by setting an error state or displaying a toast
        //     if (err.message.includes('User not found')) {
        //         // show error message
        //         console.log(err.message);
        //     }
        // }
    }

    const formik = useFormik({
        initialValues: { email: "", password: "", company: "" },
        validate: (values) => {
            const errors: any = {};
            if (!values.email) {
                errors.email = "Email is required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }
            if (!values.password && !googleEmail) {
                errors.password = "Password is required";
            }
            if (!values.company) {
                errors.company = "Company is required";
            }
            return errors;
        },
        onSubmit: async (values) => {
            setSubmitting(true);
            console.log('submit form values', values);
            try {
                // send request to backend to register user
                const { data, errors }: { data: any; errors: any } = (await googleRegisterMutation({ variables: { email: values.email, companyName: values.company } })) as { data: any; errors: any };
                console.log(data, errors);
                if (errors) {
                    throw new Error(errors[0].message);
                }
                const { email, newToken } = data.googleRegister;
                setUser({ email: email, token: newToken });
                navigate("/jobs");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="w-full max-w-md mx-auto text-left px-4 py-6 min-h-[calc(100vh-64px)] flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">Register</h1>
            <p
                className={`text-md font-medium ${
                    theme == "dark" ? "text-white" : "text-gray-500"
                } mb-2`}
            >
                Create an account to get started
            </p>
            <div
                className={`text-sm ${
                    theme == "dark" ? "text-white" : "text-gray-500"
                } mb-10`}
            >
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-primary underline hover:text-primary/90 transition-all duration-300"
                >
                    Login
                </Link>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-6 items-start"
            >
                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="email">
                        Email *
                    </label>
                    <input
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 ${
                            formik.touched.email && formik.errors.email
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
                        disabled={!!googleEmail}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-xs text-red-600">
                            {formik.errors.email}
                        </div>
                    )}
                </fieldset>

                {!googleEmail && (
                    <fieldset className="w-full flex flex-col gap-2 items-start">
                        <label
                            className="text-sm font-semibold"
                            htmlFor="password"
                        >
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
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={handleDisplayPassword}
                            >
                                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-xs text-red-500">
                                {formik.errors.password}
                            </div>
                        )}
                    </fieldset>
                )}

                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="company">
                        Company *
                    </label>
                    <input
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 ${
                            formik.touched.company && formik.errors.company
                                ? "border-red-600"
                                : theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                        id="company"
                        name="company"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.company}
                    />
                    {formik.touched.company && formik.errors.company && (
                        <div className="text-xs text-red-600">
                            {formik.errors.company}
                        </div>
                    )}
                </fieldset>

                <Button
                    loading={submitting}
                    type="submit"
                    fullWidthDesktop
                    fullWidthMobile
                >
                    Submit
                </Button>
            </form>

            {/* {!googleEmail && (
                <div className="w-full flex flex-col gap-4 items-start mt-4">
                    <div className="w-full flex gap-2 items-center justify-center">
                        <div className="w-full h-[1px] bg-gray-300"></div>
                        <div className="text-sm text-center w-fit opacity-50 whitespace-nowrap">
                            or sign up with
                        </div>
                        <div className="w-full h-[1px] bg-gray-300"></div>
                    </div>
                    <div className="google-login-button-content border-[1.3px] rounded-full mx-auto relative w-full h-12">
                        <div className="absolute flex gap-2 items-center justify-center inset-0 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img
                            src="/google-logo.webp"
                            alt="Google Logo"
                            className="logo-icon w-6 h-6"
                        />
                        Sign up with Google
                        </div>
                        <div className="absolute inset-0 w-full h-full opacity-0">
                            <GoogleLogin
                                // type="icon"
                                locale="en"
                                theme="outline"
                                width="600px"
                                text="signup_with"
                                onSuccess={loginSuccess}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                        </div>
                    </div>
                </div>
            )} */}

            {!googleEmail && (
                <div className="w-full flex flex-col gap-4 items-start mt-4">
                    <div className="w-full flex gap-2 items-center justify-center">
                        <div className="w-full h-[1px] bg-gray-300"></div>
                        <div className="text-sm text-center w-[30%] opacity-50">
                            or
                        </div>
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
            )}
        </div>
    );
};
