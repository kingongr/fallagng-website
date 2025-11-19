import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const locales = ['en', 'fr'] as const;
export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Extract locale from pathname if present
  let locale: Locale = defaultLocale;
  if (pathnameHasLocale) {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    if (firstSegment && locales.includes(firstSegment as Locale)) {
      locale = firstSegment as Locale;
    }
  } else {
    // Get locale from cookie or default to 'en'
    locale = (request.cookies.get('locale')?.value as Locale) || defaultLocale;
  }

  // Don't redirect for static files, API routes, or Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    const response = NextResponse.next();
    // Set locale cookie
    response.cookies.set('locale', locale, { 
      path: '/',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    });
    return response;
  }

  // If there's no locale in the pathname, redirect to locale-prefixed path
  if (!pathnameHasLocale) {
    const newPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    // Clone the URL and update the pathname to preserve host/protocol from request
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    // Use host header if available (for ngrok/proxy support)
    const hostHeader = request.headers.get('host');
    if (hostHeader) {
      const [hostname, port] = hostHeader.split(':');
      url.hostname = hostname;
      // Preserve port for localhost, remove for ngrok/proxy URLs
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        url.port = port || request.nextUrl.port;
      } else {
        url.port = ''; // Remove port for ngrok/proxy URLs (use default ports)
      }
    }
    const response = NextResponse.redirect(url);
    // Set locale cookie
    response.cookies.set('locale', locale, { 
      path: '/',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    });
    return response;
  }

  // Set locale cookie for existing locale-prefixed paths
  const response = NextResponse.next();
  response.cookies.set('locale', locale, { 
    path: '/',
    maxAge: 60 * 60 * 24 * 365 // 1 year
  });
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, fonts (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)',
  ],
};

