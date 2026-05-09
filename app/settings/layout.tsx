import React from "react"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SideNav from "@/components/ui/SideNav";

export default async function SettingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        redirect("/sign-in")
    }

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
                <SideNav links={links} />

                <main className="flex-1 min-w-0">{children}</main>
            </div>
        </div>
    )
}