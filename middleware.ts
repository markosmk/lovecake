import { verifyRequestOrigin } from "lucia"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === "GET") {
    return NextResponse.next()
  }
  // since Next.js does not implement CSRF protection for API routes,
  // CSRF protection must be implemented when dealing with forms
  // comparing the Origin and Host header.
  const originHeader = request.headers.get("Origin")
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get("Host")
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new NextResponse(null, {
      status: 403,
    })
  }
  return NextResponse.next()
}
