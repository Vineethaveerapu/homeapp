import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const middleware = async (request: NextRequest) => {
  const supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  const ProtectedRoutes = [/^\/create$/];

  if (
    !user &&
    ProtectedRoutes.some((routes) => routes.test(request.nextUrl.pathname))
  ) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = "/auth/login";
    return NextResponse.redirect(newUrl);
  }
};
