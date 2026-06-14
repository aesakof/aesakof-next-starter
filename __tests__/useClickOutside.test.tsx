import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import useClickOutside from "@/hooks/UseClickOutside";

function TestComponent({ onClickOutside }: { onClickOutside: () => void }) {
    const ref = useClickOutside(onClickOutside);

    return (
        <div>
            <div ref={ref} data-testid="inside">
                <p>Inner content</p>
            </div>
            <p data-testid="outside">Outside content</p>
        </div>
    );
}

describe("useClickOutside", () => {
    it("calls handler when clicking outside the ref element", async () => {
        const user = userEvent.setup();
        const handleClickOutside = vi.fn();

        render(<TestComponent onClickOutside={handleClickOutside} />);

        await user.click(screen.getByTestId("outside"));
        expect(handleClickOutside).toHaveBeenCalledOnce();
    });

    it("does not call handler when clicking inside the ref element", async () => {
        const user = userEvent.setup();
        const handleClickOutside = vi.fn();

        render(<TestComponent onClickOutside={handleClickOutside} />);

        await user.click(screen.getByText("Inner content"));
        expect(handleClickOutside).not.toHaveBeenCalled();
    });

    it("does not call handler when clicking the ref element itself", async () => {
        const user = userEvent.setup();
        const handleClickOutside = vi.fn();

        render(<TestComponent onClickOutside={handleClickOutside} />);

        await user.click(screen.getByTestId("inside"));
        expect(handleClickOutside).not.toHaveBeenCalled();
    });
});