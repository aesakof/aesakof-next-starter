"use client"

import Button from "@/components/ui/Button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"

// export const metadata = {
//     title: "Sign In",
//     description: "Sign in to your account"
// }

export default function SignIn() {
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect") ?? "/"
    const router = useRouter()

    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleSubmit(e: React.BaseSyntheticEvent) {
        e.preventDefault()
        setErrors("")
        setLoading(true)

        const isEmail = formData.emailOrUsername.includes("@")
        const { error } = isEmail
            ? await authClient.signIn.email({
                email: formData.emailOrUsername,
                password: formData.password,
                fetchOptions: { onSuccess: () => router.push(redirect) }
            })
            : await authClient.signIn.username({
                username: formData.emailOrUsername,
                password: formData.password,
                fetchOptions: { onSuccess: () => router.push(redirect) }
            })

        setLoading(false)
        if (error) setErrors(error.message ?? "Something went wrong.")
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg gap-6 p-8 border border-gray-300 rounded-lg shadow-md">
                <p className="text-3xl font-bold mb-4 font-(family-name:--font-geist-sans)">
                    Sign in for [PROJECT NAME]
                </p>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Username or email address</label>
                    <input 
                        id="emailOrUsername" 
                        name="emailOrUsername" 
                        type="text" 
                        placeholder="Username or email address"
                        onChange={handleChange} 
                        className="border border-gray-400 rounded-md px-3 py-2 w-full" 
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                        <label htmlFor="password">Password</label>
                        <Link href="/forgot-password" className="hover:underline text-blue-600">Forgot password?</Link>
                    </div>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="Password"
                        onChange={handleChange}
                        className="border border-gray-400 rounded-md px-3 py-2 w-full" 
                    />
                </div>
                <div className="h-5">
                    {errors && <p className="text-sm text-red-600">{errors}</p>}  
                </div>              
                <Button type="submit" isLoading={loading} fullWidth={true}>Sign In</Button>
                <p>Need an account? <Link href="/sign-up" className="hover:underline text-blue-600">Sign up</Link></p>
            </form>
        </div>
    )
}