"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

type NavLink = {
    label: string,
    href: string
}

type SideNavProps = {
    links: NavLink[]
}

export default function SideNav({ links }: SideNavProps) {
    const pathname = usePathname()

    return (
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
    )

}