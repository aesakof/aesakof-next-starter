/* eslint-disable react/no-unescaped-entities */
import LinkButton from "@/components/ui/LinkButton"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24">
            <h1 className="text-6xl font-heading font-semibold mb-4">404</h1>
            <p className="text-lg text-text-primary mb-8">Oops! This page doesn't exist.</p>
            <div className="flex gap-4">
                <LinkButton href="/" variant="primary" size="lg">Go back home</LinkButton>
            </div>
        </div>
    )
}