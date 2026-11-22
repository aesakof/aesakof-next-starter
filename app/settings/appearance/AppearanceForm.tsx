"use client"

import { useTheme } from "next-themes"
import { useTransition, useSyncExternalStore } from "react"
import { savePreferences } from "@/lib/actions/preferences"
import Card from "@/components/ui/Card"

type Theme = "light" | "dark" | "system"

const THEMES: { value: Theme; label: string; description: string }[] = [
    { value: "light", label: "Light", description: "Always light" },
    { value: "dark", label: "Dark", description: "Always dark" },
    { value: "system", label: "System", description: "Follows your OS" },
]

type Props = {
    initialTheme: Theme
}

const subscribe = () => () => {}

export default function AppearanceForm({ initialTheme }: Props) {
    const { theme, setTheme } = useTheme()
    const [isPending, startTransition] = useTransition()

    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    )

    const selectedTheme = mounted ? (theme as Theme) : initialTheme

    function handleThemeChange(value: Theme) {
        setTheme(value)
        startTransition(async () => {
            await savePreferences({ theme: value })
        })
    }

    return (
        <div className="space-y-6">
            <Card
                title="Theme"
                description="Choose how the interface looks to you."
            >
                <div className="grid grid-cols-3 gap-3 pt-2">
                    {THEMES.map(({ value, label, description }) => (
                        <button
                            key={value}
                            onClick={() => handleThemeChange(value)}
                            disabled={isPending}
                            className={`rounded-lg border p-4 text-left transition-colors ${
                                selectedTheme === value
                                    ? "border-primary bg-primary/10 text-text-primary"
                                    : "border-border hover:bg-surface text-text-primary"
                            }`}
                        >
                            <p className="font-medium text-sm">{label}</p>
                            <p className="text-xs text-text-secondary mt-0.5">{description}</p>
                        </button>
                    ))}
                </div>
            </Card>
        </div>
    )
}