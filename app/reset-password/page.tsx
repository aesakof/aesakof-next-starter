import { Suspense } from "react"
import ResetPasswordForm from "./ResetPasswordForm"

export const metadata = {
    title: "Reset Password",
}

export default function ResetPasswordPage() {
    return (
        <Suspense>
            <ResetPasswordForm />
        </Suspense>
    )
}