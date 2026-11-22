"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

export default function Breadcrumbs({
    labels = {},
}: {
    labels?: Record<string, string>;
}) {
    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter(Boolean)

    if(pathname === '/') {
        return null
    }
    
    return (
        <div className="mx-auto w-full max-w-7xl items-center px-6 pt-16 text-text-secondary">
            <Link href="/" className="hover:underline">Home</Link>

            {pathSegments.map( (segment, index) => {
                const href = "/" + pathSegments.slice(0, index + 1).join("/")
                return (
                    <Fragment key={href}>
                        <span className="px-3">/</span>
                        <Link href={href} className="hover:underline">{labels[segment] ?? segment}</Link>
                    </Fragment>
                    
                )
            })}
            <hr className="h-px mt-4 bg-foreground"></hr>
        </div>
    )
}