import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function PageLayout() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
    className={`min-h-screen ${
        theme == "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
    }`}
    >
      <Header />
      <Outlet />
    </div>
  );
}
