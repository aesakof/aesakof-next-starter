"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import UserMenu from "./UserMenu"
import { Menu, X } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function NavBar() {
    const { data: session, isPending } = authClient.useSession()
    const [smallMenuOpen, setSmallMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    async function handleSignout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    setSmallMenuOpen(false)
                    router.push("/sign-in")
                }
            }
        })
    }

    return (
        <header className="bg-surface-raised border-b border-border text-text-primary p-2 relative">
            <div className="flex justify-between items-center">
                <div className="flex">
                    <Link href="/" className="px-4 py-2">[PROJECT LOGO HERE]</Link>
                    <div className="md:flex hidden">
                        <Link href="/ui-samples" className="px-3 py-2 hover:bg-surface rounded-sm">UI Samples</Link>
                        {isPending ? null : session && <Link href="/dashboard" className="px-3 py-2 hover:bg-surface rounded-sm">Dashboard</Link>}
                    </div>
                </div>
                <div className="md:flex items-center gap-4 hidden">
                    {
                        isPending ? null : session ? <UserMenu username={session.user.username!}/> :
                        <>
                            <Link href={`/sign-in?redirect=${pathname}`} className="px-3 py-2 hover:bg-surface rounded-sm">Sign In</Link>
                            <Link href="/sign-up" className="px-3 py-2 hover:bg-surface rounded-sm">Register</Link>
                        </>
                    }
                </div>
                <button onClick={() => setSmallMenuOpen(!smallMenuOpen)} className="md:hidden flex px-4 py-2 hover:bg-surface rounded-sm">
                    {smallMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
            {smallMenuOpen &&
                <div className="md:hidden z-50 flex flex-col px-4 py-2 rounded-b-sm absolute top-full left-0 right-0 bg-surface border-b border-border">
                    {isPending ? null : session ? (
                        <>
                            <Link href="/ui-samples" onClick={() => setSmallMenuOpen(false)} className="px-3 py-1 hover:bg-border rounded-sm">UI Samples</Link>
                            <Link href="/dashboard" onClick={() => setSmallMenuOpen(false)} className="px-3 py-1 hover:bg-border rounded-sm">Dashboard</Link>
                            <Link href="/settings" onClick={() => setSmallMenuOpen(false)} className="px-3 py-1 hover:bg-border rounded-sm">Settings</Link>
                            <button onClick={handleSignout} className="px-3 py-1 hover:bg-border rounded-sm text-left">Sign out</button>
                        </>
                    ) : (
                        <>
                            <Link href="/ui-samples" onClick={() => setSmallMenuOpen(false)} className="px-3 py-1 hover:bg-border rounded-sm">UI Samples</Link>
                            <Link href={`/sign-in?redirect=${pathname}`} onClick={() => setSmallMenuOpen(false)} className="px-3 py-1 hover:bg-border rounded-sm">Sign In</Link>
                            <Link href="/sign-up" onClick={() => setSmallMenuOpen(false)} className="px-3 py-1 hover:bg-border rounded-sm">Register</Link>
                        </>
                    )}
                </div>
            }
        </header>
    )
}