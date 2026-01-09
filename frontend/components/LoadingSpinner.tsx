export default function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-valentine-light via-pink-50 to-red-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-valentine-pink mx-auto mb-4"></div>
                <p className="text-xl text-gray-700">{message}</p>
            </div>
        </div>
    )
}
