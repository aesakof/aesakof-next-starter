"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import Button from "@/components/ui/Button"

export default function ResetPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        setError("")
        if (password !== confirm) { setError("Passwords do not match."); return }
        if (!token) { setError("Invalid or missing reset token."); return }

        setLoading(true)
        const { error } = await authClient.resetPassword({ newPassword: password, token })
        setLoading(false)

        if (error) setError(error.message ?? "Something went wrong.")
        else setSuccess(true)
    }

    if (success) return (
        <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md text-center p-8 border border-border bg-surface-raised rounded-lg">
                <h1 className="text-2xl font-semibold text-text-primary mb-2">Password updated</h1>
                <p className="text-text-secondary text-sm">You can now sign in with your new password.</p>
            </div>
        </div>
    )

    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col gap-4 w-full max-w-md p-8 border border-border bg-surface-raised rounded-lg">
                <h1 className="text-2xl font-semibold text-text-primary">Reset password</h1>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-text-secondary">New password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="border border-input-border bg-input-bg text-text-primary rounded-md px-3 py-1.5 text-sm"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-text-secondary">Confirm new password</label>
                    <input
                        type="password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        className="border border-input-border bg-input-bg text-text-primary rounded-md px-3 py-1.5 text-sm"
                    />
                    <div className="h-5">
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                </div>
                <Button variant="primary" onClick={handleSubmit} isLoading={loading}>
                    Reset password
                </Button>
            </div>
        </div>
    )
}