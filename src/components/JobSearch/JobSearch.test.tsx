import { render, screen, waitFor } from "@testing-library/react";
import JobsSearch from "./JobsSearch";
import { ThemeContext } from "../../context/ThemeContext";
import userEvent from "@testing-library/user-event";

// Set up mocks
jest.mock("../../context/ThemeContext", () => ({
    useTheme: () => ({ theme: "light" }),
}));

const mockOnSubmit = jest.fn();
const mockSetActiveCategory = jest.fn();
const mockClearFilters = jest.fn();

const defaultProps = {
    activeCategory: "All",
    setActiveCategory: mockSetActiveCategory,
    onSubmit: mockOnSubmit,
    clearFilters: mockClearFilters,
};

describe("JobSearch component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("renders without crashing", async () => {
        const user = userEvent.setup();
        render(<JobsSearch {...defaultProps} />);

        // Find elements (accept Categoies)
        // The key is that these ones require form submission, whereas Categories are updated instantly
        const searchInput = screen.getByPlaceholderText(
            /search your dream job/i,
        );
        const locationInput = screen.getByPlaceholderText(/location/i);
        const workTypeSelect = screen.getByLabelText(/worktype/i);
        const applyButton = screen.getByRole("button", { name: /apply/i });

        // Interaction: Fill out the form
        await user.type(searchInput, "Frontend Developer");
        await user.type(locationInput, "Remote");
        await user.selectOptions(workTypeSelect, "Remote");

        // Assert: Check if Apply button is enabled (since form is nownot empty)
        expect(applyButton).not.toBeDisabled();

        // Action: Submit the form
        await user.click(applyButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                    search: "Frontend Developer",
                    location: "Remote",
                    workType: "Remote",
                }),
            );
        });
    });

    test("should trigger immediate submission when a category is clicked", async () => {
        const user = userEvent.setup();
        render(<JobsSearch {...defaultProps} />);

        // Find a category button (excluding "All")
        const designButton = screen.getByRole("button", { name: /design/i });

        await user.click(designButton);

        // Verify parent state update
        expect(mockSetActiveCategory).toHaveBeenCalledWith("UI/UX Design");

        // Verify Formik submitted immediately
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalled();
        });
    });

    test("clearing search via 'X' button triggers immediate submission", async () => {
        const user = userEvent.setup();
        render(<JobsSearch {...defaultProps} />);

        const searchInput = screen.getByPlaceholderText(
            /search your dream job/i,
        );
        await user.type(searchInput, "Designer");

        // Find the 'X' button (it only renders when search has value)
        // Your code uses an SVG inside a button, so we find it by its role
        const clearSearchBtn = screen.getByRole("button", { name: "clear-search" }); 

        await user.click(clearSearchBtn);

        expect(searchInput).toHaveValue("");
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalled();
        });
    });

    test("clearing location via 'X' button does not trigger immediate submission", async () => {
        const user = userEvent.setup();
        render(<JobsSearch {...defaultProps} />);

        const location = screen.getByPlaceholderText(
            /location/i,
        );
        await user.type(location, "Kyiv");

        // Find the 'X' button (it only renders when search has value)
        // Your code uses an SVG inside a button, so we find it by its role
        const clearLocationBtn = screen.getByRole("button", { name: "clear-location" }); 

        await user.click(clearLocationBtn);

        expect(clearLocationBtn).toHaveValue("");
        await waitFor(() => {
            expect(mockOnSubmit).not.toHaveBeenCalled();
        });
    });
});
