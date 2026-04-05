import { useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import useClickOutside from '@/hooks/UseClickOutside'
import { authClient } from '@/lib/auth-client'

type UserMenuProps = {
    username: string
}

export default function UserMenu({username}: UserMenuProps) {
    const [open, setOpen] = useState(false)
    const menuRef = useClickOutside(onClickOutside)

    function onClickOutside() {
        setOpen(false)
    }

    async function handleSignout() {
        await authClient.signOut()
        setOpen(false)
    }

    return (
        <div ref={menuRef} className="relative">
            <button onClick={() => setOpen(!open)} className="px-3 py-2 hover:bg-slate-700 rounded-sm">
                {username}
            </button>

            {open && 
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 text-white rounded-sm shadow-lg flex flex-col">
                    <Link href="/account" className="px-4 py-2 text-white hover:bg-slate-700 rounded-sm">Account</Link>
                    <button onClick={handleSignout} className="px-4 py-2 text-white hover:bg-slate-700 rounded-sm">Sign out</button>
                </div>
            }
        </div>
    )
}