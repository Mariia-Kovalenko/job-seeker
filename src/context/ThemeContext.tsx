import { createContext, useContext, useState, useEffect } from "react";
import { THEMES } from "../utils/constants";

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType>({
    theme: THEMES.DARK,
    toggleTheme: () => {},
});

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDark ? THEMES.DARK : THEMES.LIGHT;
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored && stored !== theme) {
            setTheme(stored);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.classList.toggle(
            THEMES.DARK,
            theme === THEMES.DARK
        );
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) =>
            prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
        );
    };

    const value = { theme, toggleTheme };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}
