import { NextRequest, NextResponse } from 'next/server'
import { matchGifts } from '@/lib/gifts'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const friendInfo = {
    sex: searchParams.get('sex') || '',
    age: parseInt(searchParams.get('age') || '0'),
    national: searchParams.get('national') || '',
    job: searchParams.get('job') || '',
  }

  if (!friendInfo.sex || !friendInfo.age || !friendInfo.national || !friendInfo.job) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  const gifts = matchGifts(friendInfo)

  return NextResponse.json({ gifts })
}

