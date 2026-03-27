import { useState, useEffect, useRef } from 'react'

export default function useClickOutside(onClickOutside:() => void) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside()
            }
        }
        document.addEventListener('mousedown', handleClickOutside, true)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true)
        }
    }, [onClickOutside])

    return ref
}