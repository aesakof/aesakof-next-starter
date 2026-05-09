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

        if(newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match.")
            return
        }

        setLoading(true)
        const { error } = await authClient.changePassword({
            newPassword,
            currentPassword,
            revokeOtherSessions: true,
        });
        setLoading(false)

        if(error) {
            setPasswordError(error.message ?? "Something went wrong.")
        } else {
            setPasswordSuccess("Password changed successfully.")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }
    }

    return (
        <div className="border border-slate-200 rounded-lg">
            <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-base font-semibold text-slate-900">Change Password</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                    Update your password to keep your account secure.
                </p>
            </div>
            <div className="px-6 py-3 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-slate-700">Current password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        className="w-full max-w-sm border border-slate-300 rounded-md px-3 py-1.5 text-sm"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-slate-700">New password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full max-w-sm border border-slate-300 rounded-md px-3 py-1.5 text-sm"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-slate-700">Confirm new password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full max-w-sm border border-slate-300 rounded-md px-3 py-1.5 text-sm"
                    />
                </div>
                <div className="h-5">
                    {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                    {passwordSuccess && <p className="text-sm text-green-600">{passwordSuccess}</p>}
                </div>
            </div>
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 rounded-b-lg">
                <Button variant="primary" onClick={handlePasswordChange} isLoading={loading}>Save password</Button>
            </div>
        </div>
    )
}