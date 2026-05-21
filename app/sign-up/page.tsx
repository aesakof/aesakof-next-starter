"use client"

import Button from "@/components/ui/Button"
import Link from "next/link"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUp() {
    const router = useRouter()

    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: ""
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e: React.BaseSyntheticEvent) {
        e.preventDefault()
        setErrors("")

        if (formData.password !== formData.confirmPassword) {
            setErrors("Passwords do not match.")
            return
        }
        if (formData.password.length < 8) {
            setErrors("Password must be at least 8 characters.")
            return
        }

        setLoading(true)
        const { data, error } = await authClient.signUp.email({
            email: formData.email,
            password: formData.password,
            username: formData.username,
            name: "",
            fetchOptions: {
                onSuccess: () => router.push("/verify-email")
            }
        })
        setLoading(false)
        if (error) setErrors(error.message ?? "Something went wrong.")
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg gap-6 p-8 border border-border bg-surface-raised rounded-lg shadow-md">
                <p className="text-3xl font-bold mb-4 text-text-primary font-(family-name:--font-geist-sans)">
                    Sign up for [PROJECT NAME]
                </p>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm text-text-secondary">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        className="border border-input-border bg-input-bg text-text-primary rounded-md px-3 py-2 w-full"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-sm text-text-secondary">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        onChange={handleChange}
                        className="border border-input-border bg-input-bg text-text-primary rounded-md px-3 py-2 w-full"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm text-text-secondary">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="border border-input-border bg-input-bg text-text-primary rounded-md px-3 py-2 w-full"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword" className="text-sm text-text-secondary">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="border border-input-border bg-input-bg text-text-primary rounded-md px-3 py-2 w-full"
                    />
                </div>
                <div className="h-5">
                    {errors && <p className="text-sm text-red-500">{errors}</p>}
                </div>
                <Button type="submit" isLoading={loading} fullWidth={true}>Register</Button>
                <p className="text-text-secondary text-sm">Already have an account? <Link href="/sign-in" className="hover:underline text-blue-500">Sign in</Link></p>
            </form>
        </div>
    )
}