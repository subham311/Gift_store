'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Gift } from '@/types/gift'

function ResultsContent() {
  const searchParams = useSearchParams()
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGifts = async () => {
      const params = {
        sex: searchParams.get('sex') || '',
        age: searchParams.get('age') || '',
        national: searchParams.get('national') || '',
        job: searchParams.get('job') || '',
      }

      try {
        const response = await fetch('/api/suggest-gifts?' + new URLSearchParams(params))
        const data = await response.json()
        setGifts(data.gifts || [])
      } catch (error) {
        console.error('Error fetching gifts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGifts()
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-valentine-light via-pink-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-valentine-pink mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Finding perfect gifts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-light via-pink-50 to-red-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="text-valentine-red hover:text-valentine-pink font-medium mb-4 inline-block"
            >
              ← Back to search
            </Link>
            <h1 className="text-4xl font-bold text-valentine-red mb-2">
              Gift Suggestions
            </h1>
            <p className="text-gray-700">
              Based on your friend's information, we found {gifts.length} {gifts.length === 1 ? 'gift' : 'gifts'} for you!
            </p>
          </div>

          {gifts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">🎁</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No gifts available yet
              </h2>
              <p className="text-gray-600 mb-6">
                The store owner hasn't added any gifts yet. Check back soon!
              </p>
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-valentine-pink to-valentine-red text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Try Again
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gifts.map((gift) => (
                <div
                  key={gift.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {gift.image && (
                    <div className="h-48 bg-gradient-to-br from-valentine-pink to-valentine-red flex items-center justify-center">
                      <span className="text-6xl">🎁</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {gift.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {gift.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-valentine-red">
                        ${gift.price.toFixed(2)}
                      </span>
                      <button className="bg-valentine-pink text-white px-4 py-2 rounded-lg font-semibold hover:bg-valentine-red transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-valentine-light via-pink-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-valentine-pink mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}

