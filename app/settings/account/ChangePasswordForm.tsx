"use client"

import Button from "@/components/ui/Button"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordSuccess, setPasswordSuccess] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handlePasswordChange() {
        setPasswordError("")
        setPasswordSuccess("")

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match.")
            return
        }

        setLoading(true)
        const { error } = await authClient.changePassword({
            newPassword,
            currentPassword,
            revokeOtherSessions: true,
        })
        setLoading(false)

        if (error) {
            setPasswordError(error.message ?? "Something went wrong.")
        } else {
            setPasswordSuccess("Password changed successfully.")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }
    }

    return (
        <div className="border border-border rounded-lg">
            <div className="px-6 py-4 border-b border-border">
                <h2 className="text-base font-semibold text-text-primary">Change Password</h2>
                <p className="text-sm text-text-secondary mt-0.5">
                    Update your password to keep your account secure.
                </p>
            </div>
            <div className="px-6 py-3 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-text-secondary">Current password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        className="w-full max-w-sm border border-input-border bg-input-bg rounded-md px-3 py-1.5 text-sm text-text-primary"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-text-secondary">New password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full max-w-sm border border-input-border bg-input-bg rounded-md px-3 py-1.5 text-sm text-text-primary"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-text-secondary">Confirm new password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full max-w-sm border border-input-border bg-input-bg rounded-md px-3 py-1.5 text-sm text-text-primary"
                    />
                </div>
                <div className="h-5">
                    {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                    {passwordSuccess && <p className="text-sm text-green-500">{passwordSuccess}</p>}
                </div>
            </div>
            <div className="px-6 py-3 border-t border-border bg-surface rounded-b-lg">
                <Button variant="primary" onClick={handlePasswordChange} isLoading={loading}>Save password</Button>
            </div>
        </div>
    )
}