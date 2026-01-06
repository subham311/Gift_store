'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-light via-pink-50 to-red-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-valentine-red mb-4">
              💝 Welcome to Valentine Gift Store
            </h1>
            <p className="text-2xl text-gray-700 mb-8">
              Find the perfect gift for your loved ones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Young man"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-center">Young Man</h3>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
                  alt="Young woman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-center">Young Woman</h3>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
                  alt="Young man"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-center">Young Man</h3>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
                  alt="Young woman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-center">Young Woman</h3>
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="space-y-4">
              <Link
                href="/finder"
                className="inline-block bg-gradient-to-r from-valentine-pink to-valentine-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Find Perfect Gifts 💝
              </Link>
              <div className="text-center">
                <Link
                  href="/admin"
                  className="inline-block text-valentine-red hover:text-valentine-pink font-medium transition-colors"
                >
                  Are you the store owner? Manage gifts →
                </Link>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Link
                href="/login"
                className="bg-white border-2 border-valentine-pink text-valentine-red px-6 py-3 rounded-lg font-semibold hover:bg-valentine-light transition-all duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-valentine-pink to-valentine-red text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
