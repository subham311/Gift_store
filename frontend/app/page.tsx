import Link from 'next/link'
import SearchForm from '@/components/SearchForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-light via-pink-50 to-red-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-valentine-red mb-4">
              💝 Valentine Gift Finder
            </h1>
            <p className="text-xl text-gray-700">
              Tell us about your friend and we'll suggest the perfect gift!
            </p>
          </div>

          <SearchForm />

          <div className="text-center">
            <Link
              href="/admin"
              className="inline-block text-valentine-red hover:text-valentine-pink font-medium transition-colors"
            >
              Are you the store owner? Manage gifts →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

