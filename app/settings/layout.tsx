"use client"

import Link from "next/link";
import React from "react"

export default function SettingsLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <div className="flex-1 mx-auto w-full max-w-7xl px-4 py-10">
            <h1 className="text-4xl font-bold font-(family-name:--font-geist-sans)">
                Settings
            </h1>
            <p className="text-sm text-slate-500 mt-1">
                Manage your profile and account settings.
            </p>
            <div className="flex mt-4 gap-8">
                <div className="flex flex-col w-48">
                    <Link className="border rounded-md px-2 py-1 mb-1" href="/settings/account">Account</Link>
                    <Link className="border rounded-md px-2 py-1 mb-2" href="/settings/appearance">Appearance</Link>
                </div>
                {children}
            </div>
        </div>
    )
}