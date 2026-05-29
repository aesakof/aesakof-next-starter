"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import UserMenu from "./UserMenu"
import { Menu, X } from "lucide-react"
import { authClient } from "@/lib/auth-client"

function MobileLink({href, onClick, children}: {href: string, onClick?: () => void, children:React.ReactNode}) {
    return (
        <Link href={href} onClick={onClick} className="px-3 py-1 hover:bg-border rounded-sm">
            {children}
        </Link>
    )
}

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

    const publicLinks = [
        { href: "/ui-samples", label: "UI Samples" }
    ]

    const closeMenu = () => setSmallMenuOpen(false)

    return (
        <header className="bg-surface-raised border-b border-border text-text-primary p-2 relative">
            <div className="flex justify-between items-center">
                <div className="flex">
                    <Link href="/" className="px-4 py-2">[PROJECT LOGO HERE]</Link>
                    <div className="md:flex hidden">
                        {publicLinks.map(link => (
                            <Link key={link.href} href={link.href} className="px-3 py-2 hover:bg-surface rounded-sm">
                                {link.label}
                            </Link>
                        ))}
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
                            <MobileLink href="/ui-samples" onClick={closeMenu}>UI Samples</MobileLink>
                            <MobileLink href="/dashboard" onClick={closeMenu}>Dashboard</MobileLink>
                            <MobileLink href="/settings" onClick={closeMenu}>Settings</MobileLink>
                            <button onClick={handleSignout} className="px-3 py-1 hover:bg-border rounded-sm text-left">Sign out</button>
                        </>
                    ) : (
                        <>
                            <MobileLink href="/ui-samples" onClick={closeMenu}>UI Samples</MobileLink>
                            <MobileLink href={`/sign-in?redirect=${pathname}`} onClick={closeMenu}>Sign In</MobileLink>
                            <MobileLink href="/sign-up" onClick={closeMenu}>Register</MobileLink>
                        </>
                    )}
                </div>
            }
        </header>
    )
}