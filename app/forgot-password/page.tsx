"use client"

import Button from "@/components/ui/Button"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        setLoading(true)
        await authClient.requestPasswordReset({
            email,
            redirectTo: "/reset-password"
        })
        setLoading(false)
        setSent(true)
    }

    if (sent) return (
        <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md text-center p-8 border border-border rounded-lg">
                <h1 className="text-2xl font-semibold mb-2">Check your email</h1>
                <p className="text-text-secondary text-sm">
                    If an account exists for {email}, you will receive a reset link shortly.
                </p>
            </div>
        </div>
    )

    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col gap-4 w-full max-w-md p-8 border border-border rounded-lg">
                <h1 className="text-2xl font-semibold">Reset your password</h1>
                <p className="text-sm text-text-secondary">
                    Enter your email address and we will send you a reset link.
                </p>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-text-primary">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="border border-input-border bg-input-bg text-text-primary rounded-md px-3 py-1.5 text-sm"
                    />
                </div>
                <Button variant="primary" onClick={handleSubmit} isLoading={loading}>
                    Send reset email
                </Button>
            </div>
        </div>
    )
}