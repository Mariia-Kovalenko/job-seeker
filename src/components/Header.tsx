import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../icons/ThemeToggle";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  console.log("current theme in header", theme, toggleTheme);
  return (
    <header
      className={`header w-full h-12 border-b flex flex-col sticky top-0
    ${
      theme == "dark"
        ? "border-white bg-gray-800"
        : "border-gray-400 bg-white"
    }`}
    >
      <div className="header-inner h-full flex items-center justify-start gap-4 px-4 pb-1">
        <div>Logo</div>

        <NavLink to="/">Home</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>

        <button onClick={toggleTheme} className="">
          <ThemeToggle />
        </button>
      </div>
    </header>
  );
}
