import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../icons/ThemeToggle";
import Logo from "../icons/Logo";
import Toggle from "../common/Toggle";
import IconDarkMode from "../icons/IconDarkMode";
import IconLightMode from "../icons/IconLightMode";
import { useState, useEffect } from "react";
import useWindowResize from "../hooks/useWindowResize";
import { useUserStore } from "../store/userStore";

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    console.log("current theme in header", theme, toggleTheme);

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const user = useUserStore((state) => state.user);
    console.log("user in header", user);

    useEffect(() => {
      setIsOpen(false);
    }, [location]);

    const windowWidth = useWindowResize();

    const navigate = useNavigate();

    // when md width, set isOpen to false
    useEffect(() => {
      if (windowWidth >= 760) {
        setIsOpen(false);
      }
    }, [windowWidth]);

    const toggleNavigation = () => {

      console.log("isOpen", isOpen);
        setIsOpen(!isOpen);
    }

    const logout = () => {
        useUserStore.getState().logout();
        navigate('/login');
    }
    return (
        <header
            style={{ zIndex: 100 }}
            className={`header w-full h-[64px] border-b flex flex-col fixed top-0
    ${
        theme == "dark"
            ? "border-lighterGrey bg-darkBackground"
            : "border-lighterGrey bg-white"
    }`}
        >
            <div className="header-inner h-full flex items-center justify-between gap-4 px-4 pb-1">
                <div className="logo">
                    <Logo />
                </div>
                <ul
                // style={{ right: isOpen ? "0px" : "-340px" }}
                 className={`${isOpen ? "right-0" : "right-[-340px]"} header-navigation shadow-lg md:shadow-none border-l border-l-lighterGrey ${theme == "dark" ? "bg-[#2d2c2c] text-white" : "bg-[#f4f4f4] text-darkBackground"} transition-all duration-300 flex flex-col items-start top-[64px] absolute h-[calc(100vh-64px)] w-[340px] z-100 md:border-none md:w-fit md:flex-row md:bg-transparent md:relative md:top-0 md:right-auto md:h-full md:items-center md:justify-center md:gap-8`}>
                    {/* <div><Logo /></div> */}

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `pl-4 pr-4 py-3 border-l-4 w-full md:w-fit md:border-none
                            ${isActive ? "text-primary border-primary font-semibold" : "border-transparent"}
                            ${theme === "dark" && !isActive ? "text-white" : "text-black"}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/jobs"
                        className={({ isActive }) =>
                            `pl-4 pr-4 py-3 w-full md:w-fit border-l-4 md:border-none
                            ${isActive ? "text-primary border-primary font-semibold" : "border-transparent"}
                            ${theme === "dark" && !isActive ? "text-white" : "text-black"}`
                        }
                    >
                        Jobs
                    </NavLink>
                    {user && (
                        <NavLink
                            to="/job-form"
                            className={({ isActive }) =>
                                `pl-4 pr-4 py-3 w-full md:w-fit border-l-4 md:border-none
                                ${isActive ? "text-primary border-primary font-semibold" : "border-transparent"}
                                ${theme === "dark" && !isActive ? "text-white" : "text-black"}`
                            }
                        >
                            Job Form
                        </NavLink>
                    )}

                    {/* mobile sign in footer */}
                    <div className="flex flex-col items-start justify-start gap-4 absolute bottom-0 left-0 w-full p-4 md:hidden bg-white/10 backdrop-blur-md">
                        
                        {user ? (
                            <div className="flex items-start justify-start gap-4 w-full">
                                <NavLink to="/profile" className="flex items-center justify-center w-[50%] h-10 bg-primary text-white px-4 py-2 rounded-full">
                                    Profile
                                </NavLink>
                                <button onClick={logout} className="flex items-center justify-center w-[50%] h-10 border-[1.3px] border-primary text-primary px-4 py-2 rounded-full">
                                    Logout
                                </button>
                            </div>
                            // <NavLink to="/profile" className="flex items-center justify-center w-fit h-10 bg-primary text-white px-4 py-2 rounded-full">
                            //     {user.email}
                            // </NavLink>
                        ) : (
                            <NavLink to="/login" className="flex items-center justify-center w-fit h-10 bg-primary text-white px-4 py-2 rounded-full">
                                Sign In
                            </NavLink>
                        )}
                    </div>
                </ul>

                {/* <button
                    onClick={toggleTheme}
                    className="theme-toggle-mobile md:hidden"
                >
                    <ThemeToggle />
                </button> */}

                <ul className="header-actions h-full flex items-center justify-start gap-4">
                    {/* login/sign up dropdown */}
                    <div className="relative hidden md:block">
                        {user ? (
                            <NavLink to="/profile" className="flex items-center justify-center w-fit h-10 bg-primary text-white px-4 py-2 rounded-full">
                                Profile
                            </NavLink>
                        ) : (
                            <NavLink to="/login" className="flex items-center justify-center w-fit h-10 bg-primary text-white px-4 py-2 rounded-full">
                                Sign In
                            </NavLink>
                        )}
                    </div>
                    <Toggle
                        isOnComponent={<IconDarkMode />}
                        offComponent={<IconLightMode />}
                        className=""
                    />

                    {/* burger menu */}
                    <button
                        className="burger-menu md:hidden flex items-center justify-center w-10 h-10"
                        onClick={toggleNavigation}
                    >
                        {isOpen ? (
                            theme === "dark" ? (
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 2.5L17.5 17.5M2.5 17.5L17.5 2.5"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 2.5L17.5 17.5M2.5 17.5L17.5 2.5"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )
                        ) : (
                            theme === "dark" ? (
                                <svg
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3.125 7.8125H21.875M3.125 13.125H21.875M3.125 18.4375H21.875"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3.125 7.8125H21.875M3.125 13.125H21.875M3.125 18.4375H21.875"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )
                        )}
                    </button>
                </ul>
            </div>
        </header>
    );
}
