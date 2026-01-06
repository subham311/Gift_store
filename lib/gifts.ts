import { Gift } from '@/types/gift'
import fs from 'fs'
import path from 'path'

const giftsFilePath = path.join(process.cwd(), 'data', 'gifts.json')

export function getGiftsFilePath(): string {
  return giftsFilePath
}

export function ensureDataDirectory(): void {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

export function loadGifts(): Gift[] {
  ensureDataDirectory()
  
  if (!fs.existsSync(giftsFilePath)) {
    fs.writeFileSync(giftsFilePath, JSON.stringify([], null, 2))
    return []
  }

  try {
    const fileData = fs.readFileSync(giftsFilePath, 'utf-8')
    return JSON.parse(fileData)
  } catch (error) {
    console.error('Error loading gifts:', error)
    return []
  }
}

export function saveGifts(gifts: Gift[]): void {
  ensureDataDirectory()
  fs.writeFileSync(giftsFilePath, JSON.stringify(gifts, null, 2))
}

export function addGift(gift: Gift): void {
  const gifts = loadGifts()
  gifts.push(gift)
  saveGifts(gifts)
}

export function matchGifts(friendInfo: {
  sex: string
  age: number
  national: string
  job: string
}): Gift[] {
  const gifts = loadGifts()
  
  if (gifts.length === 0) {
    return []
  }

  return gifts
    .map(gift => {
      let score = 0

      // Gender matching
      if (gift.categories.gender && gift.categories.gender.length > 0) {
        if (gift.categories.gender.includes(friendInfo.sex.toLowerCase())) {
          score += 3
        }
      } else {
        score += 1
      }

      // Age matching
      if (gift.categories.ageRange) {
        const { min, max } = gift.categories.ageRange
        if (friendInfo.age >= min && friendInfo.age <= max) {
          score += 3
        } else {
          score += 0.5
        }
      } else {
        score += 1
      }

      // Nationality matching
      if (gift.categories.nationalities && gift.categories.nationalities.length > 0) {
        if (gift.categories.nationalities.some(n => 
          n.toLowerCase().includes(friendInfo.national.toLowerCase()) ||
          friendInfo.national.toLowerCase().includes(n.toLowerCase())
        )) {
          score += 2
        }
      } else {
        score += 0.5
      }

      // Job matching
      if (gift.categories.jobs && gift.categories.jobs.length > 0) {
        if (gift.categories.jobs.some(j => 
          j.toLowerCase().includes(friendInfo.job.toLowerCase()) ||
          friendInfo.job.toLowerCase().includes(j.toLowerCase())
        )) {
          score += 2
        }
      } else {
        score += 0.5
      }

      return { gift, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.gift)
}

