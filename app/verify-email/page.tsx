export default function VerifyEmailPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="max-w-md text-center p-8 border border-slate-200 rounded-lg">
                <h1 className="text-2xl font-semibold mb-2">Check your email</h1>
                <p className="text-slate-500 text-sm">
                    We sent you a verification link. Click it to activate your account.
                </p>
            </div>
        </div>
    )
}