import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "@/components/ui/Card";

describe("Card", () => {
    it("renders title when provided", () => {
        render(<Card title="My Card" />);
        expect(screen.getByText("My Card")).toBeInTheDocument();
    });

    it("renders description when provided", () => {
        render(<Card description="A description" />);
        expect(screen.getByText("A description")).toBeInTheDocument();
    });

    it("renders children when provided", () => {
        render(<Card><p>Card content</p></Card>);
        expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders footer when provided", () => {
        render(<Card footer={<button>Save</button>} />);
        expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("does not render the header section when neither title nor description is provided", () => {
        render(<Card><p>Card content</p></Card>);
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });
});