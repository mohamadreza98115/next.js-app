import {withAuth} from "next-auth/middleware";

export default withAuth(
    // function middleware(req: NextRequestWithAuth) {
    //     if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN") {
    //         return NextResponse.rewrite(new URL("/login?message=You are not authorized", req.url))
    //     }
    //     if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "USER") {
    //         return NextResponse.rewrite(new URL("/login?message=You are not authorized", req.url))
    //     }
    // },
    {
        callbacks: {
            authorized: async ({req, token}) => {
                if (req.nextUrl.pathname.startsWith("/admin"))
                    return token?.role === "ADMIN"
                return !!token;
            }
        }
    }
);

export const config = {
    matcher: ["/admin/:path*", "/user/:path*"]
}