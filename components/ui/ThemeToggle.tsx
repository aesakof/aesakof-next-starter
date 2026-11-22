"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-surface rounded-sm"
            aria-label="Toggle theme"
        >
            <Sun size={18} className="hidden dark:block" />
            <Moon size={18} className="block dark:hidden" />
        </button>
    )
}