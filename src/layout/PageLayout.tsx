import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function PageLayout() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
    className={`min-h-screen overflow-x-hidden ${
        theme == "dark" ? "bg-darkBackground text-white" : "bg-white text-darkBackground"
    }`}
    >
      <Header />
      <Outlet />
    </div>
  );
}
