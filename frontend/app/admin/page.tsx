'use client'

import { useState, useEffect } from 'react'
import { Gift } from '@/types/gift'
import Link from 'next/link'
import { fetchGifts, addGift, deleteGift } from '@/lib/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import GiftCard from '@/components/GiftCard'
import GiftForm from '@/components/GiftForm'

export default function AdminPage() {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadGifts()
  }, [])

  const loadGifts = async () => {
    try {
      const data = await fetchGifts()
      setGifts(data.gifts || [])
    } catch (error) {
      console.error('Error loading gifts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddGift = async (formData: FormData) => {
    try {
      await addGift(formData)
      loadGifts()
    } catch (error) {
      console.error('Error adding gift:', error)
      alert('Failed to add gift')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gift?')) return

    try {
      await deleteGift(id)
      loadGifts()
    } catch (error) {
      console.error('Error deleting gift:', error)
      alert('Failed to delete gift')
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-light via-pink-50 to-red-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <Link
                href="/"
                className="text-valentine-red hover:text-valentine-pink font-medium mb-4 inline-block"
              >
                ← Back to home
              </Link>
              <h1 className="text-4xl font-bold text-valentine-red mb-2">
                Gift Management
              </h1>
              <p className="text-gray-700">
                Manage your store's gift inventory ({gifts.length} {gifts.length === 1 ? 'gift' : 'gifts'})
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-valentine-pink to-valentine-red text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              {showForm ? 'Cancel' : '+ Add New Gift'}
            </button>
          </div>

          {showForm && (
            <GiftForm onSubmit={handleAddGift} onCancel={() => setShowForm(false)} />
          )}

          {gifts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No gifts in store
              </h2>
              <p className="text-gray-600 mb-6">
                Start by adding your first gift to the store!
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-valentine-pink to-valentine-red text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Add First Gift
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onDelete={handleDelete}
                  showDelete={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

