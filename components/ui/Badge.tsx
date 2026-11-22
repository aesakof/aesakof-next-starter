import { ReactNode } from "react"

type BadgeProps = {
    children: ReactNode,
    variant?: "primary" | "secondary" | "danger",
    size?: "xs3" | "xs2" | "xs" | "sm" | "md" | "lg" | "xl",
    fullWidth?: boolean,
}

export default function Badge({
    children,
    variant = "primary",
    size = "sm",
}: BadgeProps) {

    const variantClasses = {
        primary: "bg-primary text-primary-foreground",
        secondary: "border border-border text-text-primary",
        danger: "bg-red-600 text-white",
    }

    const sizeClasses = {
        xs2: "text-2xs py-1 px-2 rounded-2xl",
        xs3: "text-3xs py-1 px-2 rounded-2xl",
        xs: "text-xs py-1 px-2 rounded-2xl",
        sm: "text-sm py-1 px-2 rounded-2xl",
        md: "text-base py-2 px-4 rounded-2xl",
        lg: "text-lg py-3 px-6 rounded-2xl",
        xl: "text-xl py-4 px-8 rounded-2xl"
    }

    return (
        <span
            className={`
                font-medium
                ${sizeClasses[size]} 
                ${variantClasses[variant]}
            `}
        >
            {children}
        </span>
    )
}