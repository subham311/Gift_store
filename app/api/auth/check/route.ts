import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request)
  
  if (session) {
    return NextResponse.json({ authenticated: true, user: session })
  }
  
  return NextResponse.json({ authenticated: false })
}

