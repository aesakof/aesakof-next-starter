"use client"

import Button from "@/components/ui/Button"
import { useState } from "react"
import { authClient } from "@/lib/auth-client";
import Modal from "@/components/ui/Modal";

export default function Account() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordSuccess, setPasswordSuccess] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [loading, setLoading] = useState(false)

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deletePassword, setDeletePassword] = useState("")
    const [deleteError, setDeleteError] = useState("")
    const [deleteLoading, setDeleteLoading] = useState(false)

    async function handlePasswordChange() {
        setPasswordError("")
        setPasswordSuccess("")

        if(newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match.")
            return
        }

        setLoading(true)
        const { data, error } = await authClient.changePassword({
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

    async function handleDeleteAccount() {
        setDeleteError("")
        setDeleteLoading(true)
        const { error } = await authClient.deleteUser({ password: deletePassword })
        setDeleteLoading(false)

        if (error) {
            setDeleteError(error.message ?? "Something went wrong.")
        } else {
            setDeleteModalOpen(false)
        }
    }

    return (
        <div className="flex flex-col gap-6">

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

            <div className="border border-red-200 rounded-lg">
                <div className="px-6 py-4 border-b border-red-200">
                    <h2 className="text-base font-semibold text-red-600">Delete Account</h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Permanently delete your account and all associated data. This cannot be undone.
                    </p>
                </div>
                <div className="px-6 py-4 bg-red-50 rounded-b-lg">
                    <Button variant="danger" onClick={() => setDeleteModalOpen(true)}>Delete account</Button>
                </div>
            </div>


            <Modal
                isOpen={deleteModalOpen}
                onClose={() => { setDeleteModalOpen(false); setDeletePassword(""); setDeleteError("") }}
                title="Delete Account"
            >
                <p className="text-sm text-slate-500 mb-4">
                    This will permanently delete your account and all associated data. Enter your password to confirm.
                </p>
                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <input
                        type="password"
                        value={deletePassword}
                        onChange={e => setDeletePassword(e.target.value)}
                        className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                    <div className="h-5">
                        {deleteError && <p className="text-sm text-red-600">{deleteError}</p>}
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteAccount} isLoading={deleteLoading}>
                        Delete account
                    </Button>
                </div>
            </Modal>

        </div>
    )
}