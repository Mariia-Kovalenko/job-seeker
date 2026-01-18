import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";

export default function PageLayout() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
    className={`min-h-[100vh] h-full overflow-x-hidden pt-[64px] ${
        theme == "dark" ? "bg-darkBackground text-white" : "bg-white text-darkBackground"
    }`}
    >
      <Header />
      <Outlet />

      <Footer />
    </div>
  );
}
