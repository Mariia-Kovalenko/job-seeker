// What to test:
// 1. Renders the button with the correct text.
// 2. Applies the correct classes based on props (loading, fullWidthMobile, fullWidthDesktop, center).
// 3. Calls the onClick handler when the button is clicked.
// 4. Displays a loading spinner when the loading prop is true.
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

describe("Button component", () => {
    test("renders the button with the correct text", () => {
        render(<Button>Click Me</Button>);
        expect(
            screen.getByRole("button", { name: /click me/i }),
        ).toBeInTheDocument();
    });

    test("calls onClick when clicked", async () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        await userEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("applies loading state", () => {
        render(<Button loading={true}>Loading</Button>);
        const loaderElement = screen.getByTestId("button-loader");
        expect(loaderElement).toBeInTheDocument();
    });

    test("applies fullWidthMobile and fullWidthDesktop classes", () => {
        render(
            <Button fullWidthMobile={true} fullWidthDesktop={false}>
                Full Width Mobile
            </Button>,
        );
        let buttonElement = screen.getByRole("button");
        expect(buttonElement).toHaveClass("w-full");
        expect(buttonElement).toHaveClass("md:w-fit");
    });

    test("applies centered class", () => {
        render(
            <Button center={true} >
                Full Width Mobile
            </Button>,
        );
        let buttonElement = screen.getByRole("button");
        expect(buttonElement).toHaveClass("mx-auto");
    });
});
