"use client"

import { useState } from "react"
import Link from "next/link"
import UserMenu from "./UserMenu"
import { Menu, X } from "lucide-react"

export default function NavBar() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [smallMenuOpen, setSmallMenuOpen] = useState(false)

    return (
        <header className="bg-slate-900 text-white p-2 relative">
            <div className="flex justify-between items-center">
                <div>
                    <Link href="/" className="px-4 py-2">[PROJECT LOGO HERE]</Link>
                    <Link href="/ui-samples" className="px-3 py-2 hover:bg-slate-700 rounded-sm">UI Samples</Link>
                </div>
                <div className="md:flex items-center gap-4 hidden">
                    {
                        loggedIn ? <UserMenu /> : 
                        <>
                            <Link href="/sign-in" className="px-3 py-2 hover:bg-slate-700 rounded-sm">Sign In</Link>
                            <Link href="/sign-up" className="px-3 py-2 hover:bg-slate-700 rounded-sm">Register</Link>
                        </>
                    }
                </div>
                <button onClick={() => setSmallMenuOpen(!smallMenuOpen)} className="md:hidden flex px-4 py-2 hover:bg-slate-700 rounded-sm">
                    {smallMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
            {smallMenuOpen && 
                <div className="md:hidden flex flex-col px-4 py-2 rounded-b-sm absolute top-full left-0 right-0 bg-slate-800">
                    <Link href="/sign-in" onClick={() => setSmallMenuOpen(false)} className="px-3 py-1 hover:bg-slate-700 rounded-sm">Sign In</Link>
                    <Link href="/sign-up" onClick={() => setSmallMenuOpen(false)} className="px-3 py-1 hover:bg-slate-700 rounded-sm">Register</Link>
                </div>
            }
        </header>
    )
} 