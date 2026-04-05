"use client"

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: ""
    })

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: ""
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleSubmit(e: React.BaseSyntheticEvent) {
        e.preventDefault()
        const { data, error } = await authClient.signUp.email({
            email: formData.email,
            password: formData.password,
            username: formData.username,
            name: "",
            callbackURL: "/"
        })
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg gap-6 p-8 border border-gray-300 rounded-lg shadow-md">
                <p className="text-3xl font-bold mb-4 font-(family-name:--font-geist-sans)">
                    Sign up for [PROJECT NAME]
                </p>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="Email Address" 
                        onChange={handleChange} 
                        className="border border-gray-400 rounded-md px-3 py-2 w-full" 
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        name="username" 
                        type="text" 
                        placeholder="Username" 
                        onChange={handleChange} 
                        className="border border-gray-400 rounded-md px-3 py-2 w-full" 
                    />
                    {errors.username && <p>{errors.username}</p>}
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
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        placeholder="Confirm Password" 
                        onChange={handleChange} 
                        className="border border-gray-400 rounded-md px-3 py-2 w-full" 
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>
                <Button type="submit" fullWidth={true}>Register</Button>
                <p>Already have an account? <Link href="/sign-in" className="hover:underline text-blue-600">Sign in</Link></p>
            </form>
        </div>
    )
}