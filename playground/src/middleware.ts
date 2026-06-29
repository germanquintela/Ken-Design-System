import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const AUTH_ROUTES = new Set(['/login']);

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Fail CLOSED: a misconfigured runtime (missing env) must never serve app
  // content without a session. Only the auth screens stay reachable.
  if (!url || !key) {
    return AUTH_ROUTES.has(request.nextUrl.pathname)
      ? response
      : redirectTo('/login', request, response);
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(toSet) {
        toSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // IMPORTANT: getUser() (not getSession()) revalidates the token with Supabase
  // and may refresh the session cookie via setAll above.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;
  const isAuthRoute = AUTH_ROUTES.has(pathname);

  // Nothing in the playground is reachable without a session — send guests to login.
  if (!user && !isAuthRoute) return redirectTo('/login', request, response);
  // Already signed in? The onboarding screen is pointless — go to the builder.
  if (user && isAuthRoute) return redirectTo('/', request, response);

  return response;
}

// Build a redirect that carries over any session cookies refreshed above, so a
// token rotation isn't dropped on the redirect (would otherwise loop or log out).
function redirectTo(
  pathname: string,
  request: NextRequest,
  from: NextResponse,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = '';
  const redirect = NextResponse.redirect(url);
  from.cookies.getAll().forEach((cookie) => {
    redirect.cookies.set(cookie);
  });
  return redirect;
}

export const config = {
  // Run on every route EXCEPT API handlers (they self-authenticate and must keep
  // returning JSON, not an HTML redirect), Next internals, and static assets.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf)$).*)',
  ],
};
