"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export default function SettingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname()

    const links = [
        { label: "Account", href: "/settings/account" },
        { label: "Appearance", href: "/settings/appearance" },
    ]

    return (
        <div className="flex-1 mx-auto w-full max-w-6xl px-4 py-10">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-sm text-slate-500 mt-1 mb-6">
                Manage your profile and account settings.
            </p>
            <div className="flex gap-8">
                <nav className="flex flex-col gap-0.5 w-44 shrink-0">
                    {links.map(({ label, href }) => {
                        const isActive = pathname === href
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                                    isActive
                                        ? "bg-slate-100 text-slate-900 font-medium"
                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                            >
                                {label}
                            </Link>
                        )
                    })}
                </nav>
                <main className="flex-1 min-w-0">{children}</main>
            </div>
        </div>
    )
}