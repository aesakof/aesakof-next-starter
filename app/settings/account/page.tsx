"use client"

import Button from "@/components/ui/Button"

export default function Account() {
    return (
        <div className="flex-1 flex flex-col items-left">
            <div className="">
                <h2 className="text-3xl font-semibold text-slate-900">
                    Change Password
                </h2>
                <div>
                    <input placeholder="Current Password"/>
                    <input placeholder="New Password"/>
                    <input placeholder="Confirm Password"/>  
                </div>
                <hr className="text-slate-300 mt-1" />
            </div>

            <div className="mt-8">
                <h2 className="text-3xl font-semibold text-red-400">
                    Delete Account
                </h2>  
                <hr className="text-slate-300 mt-1" />
                <p className="text-sm text-slate-500 mt-3">
                    This is irreversible.
                </p>
                <Button variant="danger">DELETE ACCOUNT</Button>
            </div>
        </div>
    )
}