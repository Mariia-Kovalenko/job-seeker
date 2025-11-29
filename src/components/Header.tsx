import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../icons/ThemeToggle";
import Logo from "../icons/Logo";
import Toggle from "../common/Toggle";
import IconDarkMode from "../icons/IconDarkMode";
import IconLightMode from "../icons/IconLightMode";
import { useState, useEffect } from "react";
import useWindowResize from "../hooks/useWindowResize";

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    console.log("current theme in header", theme, toggleTheme);

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
      setIsOpen(false);
    }, [location]);

    const windowWidth = useWindowResize();

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
    return (
        <header
            style={{ zIndex: 100 }}
            className={`header w-full h-[64px] border-b flex flex-col sticky top-0
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
                 className={`${isOpen ? "right-0" : "right-[-340px]"} header-navigation shadow-lg md:shadow-none border-l border-l-lighterGrey ${theme == "dark" ? "bg-[#2d2c2c] text-white" : "bg-white text-darkBackground"} transition-all duration-300 flex flex-col items-start top-[64px] absolute h-[calc(100vh-64px)] w-[340px] z-100 md:border-none md:w-fit md:flex-row md:bg-transparent md:relative md:top-0 md:right-auto md:h-full md:items-center md:justify-center md:gap-8`}>
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
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `pl-4 pr-4 py-3 w-full md:w-fit border-l-4 md:border-none
                            ${isActive ? "text-primary border-primary font-semibold" : "border-transparent"}
                            ${theme === "dark" && !isActive ? "text-white" : "text-black"}`
                        }
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            `pl-4 pr-4 py-3 w-full md:w-fit border-l-4 md:border-none
                            ${isActive ? "text-primary border-primary font-semibold" : "border-transparent"}
                            ${theme === "dark" && !isActive ? "text-white" : "text-black"}`
                        }
                    >
                        Register
                    </NavLink>
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
                </ul>

                {/* <button
                    onClick={toggleTheme}
                    className="theme-toggle-mobile md:hidden"
                >
                    <ThemeToggle />
                </button> */}

                <ul className="header-actions h-full flex items-center justify-start gap-4">
                    <Toggle
                        isOnComponent={<IconDarkMode />}
                        offComponent={<IconLightMode />}
                        className="hidden md:block"
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
