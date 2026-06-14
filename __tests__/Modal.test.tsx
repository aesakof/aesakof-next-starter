import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Modal from "@/components/ui/Modal";

describe("Modal", () => {
    it("renders nothing when isOpen is false", () => {
        render(<Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
            <p>Modal content</p>
        </Modal>);
        expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
        expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
    });

    it("renders title and children when isOpen is true", () => {
        render(<Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
            <p>Modal content</p>
        </Modal>);
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
        expect(screen.getByText("Modal content")).toBeInTheDocument();
    });

    it("calls onClose when Escape is pressed", async () => {
        const user = userEvent.setup();
        const handleClose = vi.fn();

        render(<Modal isOpen={true} onClose={handleClose} title="Test Modal">
            <p>Modal content</p>
        </Modal>);

        await user.keyboard("{Escape}");
        expect(handleClose).toHaveBeenCalledOnce();
    });

    it("calls onClose when the X button is clicked", async () => {
        const user = userEvent.setup();
        const handleClose = vi.fn();

        render(<Modal isOpen={true} onClose={handleClose} title="Test Modal">
            <p>Modal content</p>
        </Modal>);

        await user.click(screen.getByRole("button"));
        expect(handleClose).toHaveBeenCalledOnce();
    });

    it("calls onClose when the overlay is clicked", async () => {
        const user = userEvent.setup();
        const handleClose = vi.fn();

        const { container } = render(<Modal isOpen={true} onClose={handleClose} title="Test Modal">
            <p>Modal content</p>
        </Modal>);

        await user.click(container.firstChild as Element);
        expect(handleClose).toHaveBeenCalledOnce();
    });

    it("does not call onClose when the modal panel is clicked", async () => {
        const user = userEvent.setup();
        const handleClose = vi.fn();

        render(<Modal isOpen={true} onClose={handleClose} title="Test Modal">
            <p>Modal content</p>
        </Modal>);

        await user.click(screen.getByText("Modal content"));
        expect(handleClose).not.toHaveBeenCalled();
    });
});