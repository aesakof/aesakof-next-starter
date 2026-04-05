"use client"

import Button from "@/components/ui/Button"
import Link from "next/link"
import { useState } from "react"
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
    const [errors, setErrors] = useState({
        emailOrUsername: "",
        password: "",
    })

    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleSubmit(e: React.BaseSyntheticEvent) {
        e.preventDefault()
        const isEmail = formData.emailOrUsername.includes("@")
        if (isEmail) {
            const { data, error } = await authClient.signIn.email({
                email: formData.emailOrUsername,
                password: formData.password
            })
        } else {
            const { data, error } = await authClient.signIn.username({
                username: formData.emailOrUsername,
                password: formData.password
            })
        }
        
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
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="Email Address"
                        onChange={handleChange} 
                        className="border border-gray-400 rounded-md px-3 py-2 w-full" 
                    />
                    {errors.emailOrUsername && <p>{errors.emailOrUsername}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="Password"
                        onChange={handleChange}
                        className="border border-gray-400 rounded-md px-3 py-2 w-full" 
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <Button type="submit" fullWidth={true}>Sign In</Button>
                <p>Need an account? <Link href="/sign-up" className="hover:underline text-blue-600">Sign up</Link></p>
            </form>
        </div>
    )
}