'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <Alert variant="destructive" className='fixed right-4 bottom-4'>
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>{error.name}</AlertTitle>
            <AlertDescription>
                {error.message}
            </AlertDescription>
        </Alert>
    )
}