import { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode,
    variant?: "primary" | "secondary" | "danger",
    size?: "sm" | "md" | "lg" | "xl",
    type?: "button" | "submit" | "reset",
    fullWidth?: boolean,
    disabled?: boolean,
    isLoading?: boolean,
    onClick?: () => void
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    type = "button",
    fullWidth = false,
    disabled = false,
    isLoading = false,
    onClick
}: ButtonProps) {

    const variantClasses = {
        primary: "bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white",
        secondary: "border border-gray-400 text-gray-800 hover:bg-gray-100 active:bg-gray-300",
        danger: "bg-red-600 hover:bg-red-700 active:bg-red-900 text-white",
    }

    const sizeClasses = {
        sm: "text-sm py-1 px-2 rounded-md",
        md: "text-base py-2 px-4 rounded-md",
        lg: "text-lg py-3 px-6 rounded-lg",
        xl: "text-xl py-4 px-8 rounded-lg"
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading} 
            className={`
                transition-colors font-medium
                ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                ${fullWidth ? "w-full" : ""} 
                ${sizeClasses[size]} 
                ${variantClasses[variant]}
            `}
        >
            {isLoading ? "Loading..." : children}
        </button>
    )
}