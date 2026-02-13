// to test
// 1. Correct icon renders based on theme
// 2. Clicking toggle calls toggleTheme
// 3. UI switches after click
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggle from "./Toggle";
import { useTheme } from "../../context/ThemeContext";
import { ThemeProvider } from "../../context/ThemeContext";

const mockContextValueLight = {
    theme: "light",
    toggleTheme: jest.fn(),
};
const mockContextValueDark = {
    theme: "dark",
    toggleTheme: jest.fn(),
};

describe("Toggle component", () => {
    // Helper to render with Provider
    const renderToggle = () =>
        render(
            <ThemeProvider>
                <Toggle
                    isOnComponent={<span>🌞</span>}
                    offComponent={<span>🌙</span>}
                />
            </ThemeProvider>,
        );

    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test("renders correct icon based on default theme and switches on click", async () => {
        const user = userEvent.setup();
        renderToggle();

        // 1. Check initial state (default is light in our mock)
        const sunIcon = screen.getByText("🌞");
        expect(sunIcon).toBeInTheDocument();

        // 2. Click it
        const button = screen.getByRole("button");
        await user.click(button);

        // 3. Check if UI switched to Dark (Moon icon)
        expect(screen.getByText("🌙")).toBeInTheDocument();
    });

    test("persistence: renders OFF component when localStorage is dark", () => {
        localStorage.setItem("theme", "dark");
        renderToggle();

        expect(screen.getByText("🌙")).toBeInTheDocument();
    });
});
