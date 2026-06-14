import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Button from "@/components/ui/Button";

describe("Button", () => {
    it("renders children", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("renders Loading... when isLoading is true", () => {
        render(<Button isLoading>Click me</Button>);
        expect(screen.getByRole("button", { name: "Loading..." })).toBeInTheDocument();
    });

    it("calls onClick when clicked", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Button onClick={handleClick}>Click me</Button>);
        await user.click(screen.getByRole("button"));

        expect(handleClick).toHaveBeenCalledOnce();
    });

    it("does not call onClick when disabled", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Button onClick={handleClick} disabled>Click me</Button>);
        await user.click(screen.getByRole("button"));

        expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when isLoading", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Button onClick={handleClick} isLoading>Click me</Button>);
        await user.click(screen.getByRole("button"));

        expect(handleClick).not.toHaveBeenCalled();
    });

    it("defaults to type=button", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("applies type=submit when specified", () => {
        render(<Button type="submit">Click me</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("applies w-full when fullWidth is true", () => {
        render(<Button fullWidth>Click me</Button>);
        expect(screen.getByRole("button")).toHaveClass("w-full");
    });
});