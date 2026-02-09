import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // For now, we'll rely on client-side checks since we're storing tokens in localStorage
    // In a production app, you'd want to implement proper server-side token verification
  }

  return NextResponse.next();
}

// Specify the paths that should be protected
export const config = {
  matcher: ['/dashboard/:path*'],
};