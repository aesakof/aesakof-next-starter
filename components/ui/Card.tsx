import { ReactNode } from "react";

type CardProps = {
    title?: string;
    description?: string;
    children?: ReactNode;
    footer?: ReactNode;
    danger?: boolean;
};

export default function Card({ title, description, children, footer, danger }: CardProps) {
    return (
        <div className={`rounded-lg border bg-surface-raised ${danger ? "border-red-500/30" : "border-border"}`}>
            {(title || description) && (
                <div className="p-6 pb-4">
                    {title && <h3 className="text-base font-semibold leading-none text-text-primary">{title}</h3>}
                    {description && <p className="mt-1.5 text-sm text-text-secondary">{description}</p>}
                </div>
            )}
            {children && (
                <div className="px-6 pb-6">
                    {children}
                </div>
            )}
            {footer && (
                <div className={`px-6 py-4 rounded-b-lg border-t ${danger ? "border-red-500/30 bg-red-500/5" : "border-border bg-surface"}`}>
                    {footer}
                </div>
            )}
        </div>
    );
}