"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

type NavLink = {
    label: string
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
                                ? "bg-surface text-text-primary font-medium"
                                : "text-text-secondary hover:bg-surface hover:text-text-primary"
                        }`}
                    >
                        {label}
                    </Link>
                )
            })}
        </nav>
    )
}