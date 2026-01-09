'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchForm() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        sex: '',
        age: '',
        national: '',
        job: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const params = new URLSearchParams({
            sex: formData.sex,
            age: formData.age,
            national: formData.national,
            job: formData.job,
        })

        router.push(`/results?${params.toString()}`)
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                    </label>
                    <select
                        id="sex"
                        required
                        value={formData.sex}
                        onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink focus:border-transparent"
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                        Age *
                    </label>
                    <input
                        type="number"
                        id="age"
                        required
                        min="1"
                        max="120"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink focus:border-transparent"
                        placeholder="Enter age"
                    />
                </div>

                <div>
                    <label htmlFor="national" className="block text-sm font-medium text-gray-700 mb-2">
                        Nationality *
                    </label>
                    <input
                        type="text"
                        id="national"
                        required
                        value={formData.national}
                        onChange={(e) => setFormData({ ...formData, national: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink focus:border-transparent"
                        placeholder="e.g., American, Japanese"
                    />
                </div>

                <div>
                    <label htmlFor="job" className="block text-sm font-medium text-gray-700 mb-2">
                        Job/Profession *
                    </label>
                    <input
                        type="text"
                        id="job"
                        required
                        value={formData.job}
                        onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-valentine-pink focus:border-transparent"
                        placeholder="e.g., Engineer, Teacher, Student"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-valentine-pink to-valentine-red text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Finding Gifts...' : 'Find Perfect Gifts 💝'}
                </button>
            </form>
        </div>
    )
}
