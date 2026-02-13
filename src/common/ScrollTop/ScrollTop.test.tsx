import { render } from "@testing-library/react";
import { useLocation } from "react-router-dom"; 
import ScrollTop from "./ScrollTop";

describe("ScrollTop Component", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  beforeEach(() => {
    // Reset call counts, but the mockReturnValue from the mock file persists
    jest.clearAllMocks();
    
    // Safety: Reset the location to default before each test
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });
  });

  test("calls window.scrollTo(0, 0) when the pathname changes", () => {
    const { rerender } = render(<ScrollTop />);

    // Initial render check
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // 1. Update the mock return value to simulate a new URL
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/new-page' });

    // 2. Trigger a re-render
    rerender(<ScrollTop />);

    // Verify it was called again
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });
});