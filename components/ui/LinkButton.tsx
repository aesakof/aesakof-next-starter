import { ReactNode } from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

type ButtonProps = {
    children: ReactNode,
    variant?: "primary" | "secondary" | "danger",
    size?: "sm" | "md" | "lg" | "xl",
    fullWidth?: boolean,
    href: string
    external?: boolean
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    href,
    external = false
}: ButtonProps) {

    const variantClasses = {
        primary: "bg-primary text-primary-foreground hover:opacity-90 active:opacity-60",
        secondary: "border border-border text-text-primary hover:bg-surface active:bg-border",
        danger: "bg-red-600 hover:bg-red-700 active:bg-red-900 text-white",
    }

    const sizeClasses = {
        sm: "text-sm py-1 px-2 rounded-md",
        md: "text-base py-2 px-4 rounded-md",
        lg: "text-lg py-3 px-6 rounded-lg",
        xl: "text-xl py-4 px-8 rounded-lg"
    }

    return (
        <Link
            href={href}
            target={external ? "_blank" : undefined}
            className={`
                transition font-medium inline-flex items-center justify-center gap-2
                ${fullWidth ? "w-full" : ""} 
                ${sizeClasses[size]} 
                ${variantClasses[variant]}
            `}
        >
            {children}
            {external && <ExternalLink size="1em" aria-hidden="true" />}
        </Link>
    )
}