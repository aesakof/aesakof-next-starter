"use client"

import { useState } from "react"
import Link from "next/link"
import UserMenu from "./UserMenu"

export default function NavBar() {

    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <header className="bg-slate-900 text-white p-4 flex justify-between">
            <div>
                <Link href="/">[PROJECT LOGO HERE]</Link>
            </div>
            
            <div>
                {
                    !loggedIn ? <UserMenu /> : 
                    <>
                        <Link href="sign-in">Sign In</Link>
                        <Link href="sign-up">Register</Link>
                    </>
                }
            </div>

        </header>
    )
}