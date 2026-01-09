import { Gift } from '@/types/gift'
import { getImageUrl } from '@/lib/api'

interface GiftCardProps {
    gift: Gift
    onDelete?: (id: string) => void
    showDelete?: boolean
}

export default function GiftCard({ gift, onDelete, showDelete = false }: GiftCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {gift.image ? (
                <div className="h-48 relative bg-gray-200 overflow-hidden">
                    <img
                        src={getImageUrl(gift.image)}
                        alt={gift.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="h-48 bg-gradient-to-br from-valentine-pink to-valentine-red flex items-center justify-center">
                    <span className="text-6xl">🎁</span>
                </div>
            )}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {gift.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {gift.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-valentine-red">
                        ${gift.price.toFixed(2)}
                    </span>
                    {showDelete && onDelete && (
                        <button
                            onClick={() => onDelete(gift.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    )}
                </div>
                {!showDelete && (
                    <button className="w-full bg-valentine-pink text-white px-4 py-2 rounded-lg font-semibold hover:bg-valentine-red transition-colors">
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    )
}
