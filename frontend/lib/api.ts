const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function fetchGifts() {
  const response = await fetch(`${API_BASE_URL}/api/gifts`)
  if (!response.ok) throw new Error('Failed to fetch gifts')
  return response.json()
}

export async function suggestGifts(friendInfo: {
  sex: string
  age: number
  national: string
  job: string
}) {
  const params = new URLSearchParams({
    sex: friendInfo.sex,
    age: friendInfo.age.toString(),
    national: friendInfo.national,
    job: friendInfo.job,
  })
  
  const response = await fetch(`${API_BASE_URL}/api/suggest-gifts?${params}`)
  if (!response.ok) throw new Error('Failed to get suggestions')
  return response.json()
}

export async function addGift(giftData: FormData) {
  const response = await fetch(`${API_BASE_URL}/api/gifts`, {
    method: 'POST',
    body: giftData,
  })
  if (!response.ok) throw new Error('Failed to add gift')
  return response.json()
}

export async function deleteGift(id: number) {
  const response = await fetch(`${API_BASE_URL}/api/gifts/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete gift')
  return response.json()
}

export function getImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  const baseUrl = API_BASE_URL
  return `${baseUrl}${imagePath}`
}

