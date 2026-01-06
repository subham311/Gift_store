export interface Gift {
  id: string
  name: string
  description: string
  price: number
  image?: string
  categories: {
    gender?: string[]
    ageRange?: { min: number; max: number }
    nationalities?: string[]
    jobs?: string[]
  }
}

export interface FriendInfo {
  sex: string
  age: number
  national: string
  job: string
}

