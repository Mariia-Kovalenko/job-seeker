import { render, screen, fireEvent } from "@testing-library/react";
import { useTheme } from "../../context/ThemeContext";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import Modal from "./Modal";

// Mock the external hook
jest.mock("../../hooks/useBodyScrollLock");

// Mock the Theme Context
jest.mock("../../context/ThemeContext", () => ({
    useTheme: jest.fn(),
}));

// Mock Framer Motion to skip animations
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, onClick, className, ...props }: any) => (
            <div onClick={onClick} className={className} data-testid="motion-div" {...props}>
                {children}
            </div>
        ),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));


// Testing
describe("Modal Component", () => {
    const mockOnClose = jest.fn();
    const modalContent = "Test Modal Content";
    const modalTitle = "Test Title";

    beforeEach(() => {
        jest.clearAllMocks();
        // Default theme mock
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });
    });

    test("does not render when isOpen is false", () => {
        render(
          <Modal isOpen={false} onClose={mockOnClose}>
            <div>{modalContent}</div>
          </Modal>
        );
        
        // we use queryByText instead of getByText because the latter will throw an error if the element is not found, 
        // while queryByText will return null, which is what we expect in this case.
        expect(screen.queryByText(modalContent)).not.toBeInTheDocument();
        expect(useBodyScrollLock).toHaveBeenCalledWith(false);
    });

    test("calls onClose when the close button is clicked", () => {
        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <div>{modalContent}</div>
          </Modal>
        );

        const closeButton = screen.getByTestId("close-button");
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("calls onClose when clicking the backdrop (overlay)", () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose}>
                <div>{modalContent}</div>
            </Modal>
        );

        // The backdrop is the outer motion.div. 
        // In our mock, it's the first div with data-testid="motion-div"
        const backdrop = screen.getAllByTestId("motion-div")[0];
        fireEvent.click(backdrop);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("does NOT call onClose when clicking the modal content", () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose}>
                <div data-testid="inner-content">{modalContent}</div>
            </Modal>
        );

        const content = screen.getByTestId("inner-content");
        fireEvent.click(content);

        // stopPropagation should prevent onClose from being called
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    test("applies dark mode classes when theme is dark", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "dark" });

        render(
            <Modal isOpen={true} onClose={mockOnClose}>
                <div>{modalContent}</div>
            </Modal>
        );

        // The second motion.div is the modal container
        const modalContainer = screen.getAllByTestId("motion-div")[1];
        expect(modalContainer).toHaveClass("bg-lightGrey");
    });
})