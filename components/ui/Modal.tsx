"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { ReactNode } from "react"

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            ref={overlayRef}
            onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={18} />
                    </button>
                </div>
                <div className="px-6 py-4">
                    {children}
                </div>
            </div>
        </div>
    )
}