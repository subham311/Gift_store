import { NextRequest, NextResponse } from 'next/server'
import { loadGifts, addGift, saveGifts } from '@/lib/gifts'
import { Gift } from '@/types/gift'

export async function GET() {
  const gifts = loadGifts()
  return NextResponse.json({ gifts })
}

export async function POST(request: NextRequest) {
  try {
    const gift: Gift = await request.json()

    if (!gift.name || !gift.description || gift.price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    addGift(gift)
    return NextResponse.json({ success: true, gift }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add gift' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Missing gift ID' },
        { status: 400 }
      )
    }

    const gifts = loadGifts()
    const filteredGifts = gifts.filter(g => g.id !== id)
    saveGifts(filteredGifts)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete gift' },
      { status: 500 }
    )
  }
}

