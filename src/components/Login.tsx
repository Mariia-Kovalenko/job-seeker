import { useFormik } from "formik";
import { useState, useRef, useEffect } from "react";
import { EyeIcon } from "../icons/EyeIcon";
import { EyeSlashIcon } from "../icons/EyeSlashIcon";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import Button from "../common/Button";
import { useUserStore } from "../store/userStore";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";
import axios from "axios";
import { GOOGLE_LOGIN } from "../graphql/mutations";
import { GoogleLogin } from "@react-oauth/google";

interface MyJwtPayload extends JwtPayload {
    email?: string; // Add the email property, since it might not always be present
}

export const Login = () => {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [login, { loading, error }] = useMutation(LOGIN);
    const [googleLoginMutation] = useMutation(GOOGLE_LOGIN); 
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState<boolean>(false);

    // TODO: improve this error
    const [googleLoginError, setGoogleLoginError] = useState<string>("");

    const { setUser } = useUserStore();

    // upon visiting login, if user is already logged in, redirect to jobs
    // useEffect(() => {
    //     const user = localStorage.getItem('user');
    //     if (user) {
    //         navigate('/jobs');
    //     }
    // }, []);

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
                const { data, error }: { data: any; error: any } = (await login(
                    { variables: values }
                )) as { data: any; error: any };
                console.log(data);
                if (error) {
                    throw new Error(error.message);
                }
                const token = data.login.jwt_token;
                const company = data.login.companyName;
                localStorage.setItem("token", token);
                setUser({ email: values.email, token: token, company: company });
                // navigate("/jobs");
            } catch (error: any) {
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const loginSuccess = async (credentialResponse: any) => {
        console.log(credentialResponse);
        const token = credentialResponse.credential;
        console.log(token);

        try {
            // send request to backend to verify user and get user info
            const { data, errors }: { data: any; errors: any } = (await googleLoginMutation({ variables: { token: token } })) as { data: any; errors: any };
            console.log('response', data, errors);
            if (errors) {
                throw new Error(errors[0].message);
            }
            const { email, jwt_token, companyName } = data.googleLogin;

            setUser({ email: email, token: jwt_token, company: companyName });
            navigate("/jobs");
        } catch (err: any) {
            console.log('error', err);
            // Handle the error by setting an error state or displaying a toast
            if (err.message.includes('User not found')) {
                // show error message
                console.log('user not found');
                setGoogleLoginError("User not found");
                
            }
        }
    }

    // const googleLogin = useGoogleLogin({
    //     onSuccess: async (tokenResponse) => {
    //         console.log("response", tokenResponse);
    //         const token = tokenResponse.access_token;
    //         console.log("token", token);

    //         const userInfo = await axios.get(
    //             "https://www.googleapis.com/oauth2/v3/userinfo",
    //             {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             }
    //         );
    //         console.log("userInfo", userInfo.data);
    //         const email = userInfo.data.email;
    //         console.log("email", email);
    //         if (!email) {
    //             throw new Error("Email not found");
    //         }
    //         // add user to store
    //         setUser({ email: email, token: token });
    //         navigate("/jobs");
    //     },
    //     onError: () => {
    //         console.log("Login Failed");
    //     },
    // });

    return (
        <div className="w-full max-w-md mx-auto text-left px-4 py-6 min-h-[calc(100vh-64px)] flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <p
                className={`text-md font-medium ${
                    theme == "dark" ? "text-white" : "text-gray-500"
                } mb-2`}
            >
                Sign in to your account
            </p>
            <div
                className={`text-sm ${
                    theme == "dark" ? "text-white" : "text-gray-500"
                } mb-10`}
            >
                Do not have an account?{" "}
                <Link
                    to="/register"
                    className="text-primary underline hover:text-primary/90 transition-all duration-300"
                >
                    Register
                </Link>
            </div>
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
                            formik.touched.password && formik.errors.password
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

                <Button
                    loading={submitting}
                    type="submit"
                    fullWidthDesktop
                    fullWidthMobile
                >
                    Submit
                </Button>
            </form>

            {(error || googleLoginError) && (
                <div className="text-red-600 text-center text-sm mt-4 mb-4">
                    {error?.message || googleLoginError || "An error occurred"}
                </div>
            )}

            <div className="w-full flex flex-col gap-4 items-start mt-4">
                    <div className="w-full flex gap-2 items-center justify-center">
                        <div className="w-full h-[1px] bg-gray-300"></div>
                        <div className="text-sm text-center w-fit opacity-50 whitespace-nowrap">
                            or sign in with
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
                        Sign in with Google
                        </div>
                        <div className="absolute inset-0 w-full h-full opacity-0">
                            <GoogleLogin
                                // type="icon"
                                locale="en"
                                theme="outline"
                                width="600px"
                                text="signin_with"
                                onSuccess={loginSuccess}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                        </div>
                    </div>
                </div>

            {/*  google login
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
            */}
        </div>
    );
};
