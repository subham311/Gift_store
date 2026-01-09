'use client'

import { useState, useRef } from 'react'

interface GiftFormData {
    name: string
    description: string
    price: string
    image: string
    gender: string
    ageMin: string
    ageMax: string
    nationalities: string
    jobs: string
}

interface GiftFormProps {
    onSubmit: (formData: FormData) => Promise<void>
    onCancel: () => void
}

export default function GiftForm({ onSubmit, onCancel }: GiftFormProps) {
    const [formData, setFormData] = useState<GiftFormData>({
        name: '',
        description: '',
        price: '',
        image: '',
        gender: '',
        ageMin: '',
        ageMax: '',
        nationalities: '',
        jobs: '',
    })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formDataToSend = new FormData()
        formDataToSend.append('name', formData.name)
        formDataToSend.append('description', formData.description)
        formDataToSend.append('price', formData.price)

        if (imageFile) {
            formDataToSend.append('image', imageFile)
        } else if (formData.image) {
            formDataToSend.append('imageUrl', formData.image)
        }

        if (formData.gender) {
            formDataToSend.append('gender', formData.gender)
        }
        if (formData.ageMin) {
            formDataToSend.append('ageMin', formData.ageMin)
        }
        if (formData.ageMax) {
            formDataToSend.append('ageMax', formData.ageMax)
        }
        if (formData.nationalities) {
            formDataToSend.append('nationalities', formData.nationalities)
        }
        if (formData.jobs) {
            formDataToSend.append('jobs', formData.jobs)
        }

        await onSubmit(formDataToSend)

        setFormData({
            name: '',
            description: '',
            price: '',
            image: '',
            gender: '',
            ageMin: '',
            ageMax: '',
            nationalities: '',
            jobs: '',
        })
        setImageFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
        onCancel()
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Gift</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gift Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price * ($)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Image (optional)
                    </label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                                setImageFile(file)
                                setFormData({ ...formData, image: '' })
                            }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink"
                    />
                    {imageFile && (
                        <p className="text-sm text-gray-600">Selected: {imageFile.name}</p>
                    )}
                    <div className="text-sm text-gray-500">OR</div>
                    <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => {
                            setFormData({ ...formData, image: e.target.value })
                            setImageFile(null)
                            if (fileInputRef.current) {
                                fileInputRef.current.value = ''
                            }
                        }}
                        placeholder="Enter image URL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gender (comma-separated, optional)
                        </label>
                        <input
                            type="text"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            placeholder="e.g., male, female"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Age Min
                            </label>
                            <input
                                type="number"
                                value={formData.ageMin}
                                onChange={(e) => setFormData({ ...formData, ageMin: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Age Max
                            </label>
                            <input
                                type="number"
                                value={formData.ageMax}
                                onChange={(e) => setFormData({ ...formData, ageMax: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nationalities (comma-separated, optional)
                    </label>
                    <input
                        type="text"
                        value={formData.nationalities}
                        onChange={(e) => setFormData({ ...formData, nationalities: e.target.value })}
                        placeholder="e.g., American, Japanese"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jobs (comma-separated, optional)
                    </label>
                    <input
                        type="text"
                        value={formData.jobs}
                        onChange={(e) => setFormData({ ...formData, jobs: e.target.value })}
                        placeholder="e.g., Engineer, Teacher, Student"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-valentine-pink to-valentine-red text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                        Add Gift
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
