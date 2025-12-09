import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

const publicRoutes = [
    '/',
    '/login',
    '/create'
];

// Função auxiliar para validar token dentro do Edge Runtime (Middleware)
async function verifyToken(token: string) {
    try {
        const encodedKey = new TextEncoder().encode(process.env.TOKEN);
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export default async function middleware(req: NextRequest) {
    
    const pathname = req.nextUrl.pathname;

    const sessionCookie = req.cookies.get('session')?.value;
    
    // Se não tiver cookie, session será null. Se tiver tenta validar.
    const session = sessionCookie ? await verifyToken(sessionCookie) : null;

    // Lógica de Redirecionamento
    
    // Manda pro Dashboard
    if (publicRoutes.includes(pathname) && session) {
        return NextResponse.redirect(new URL(`/dashboard/${session.userId}`, req.nextUrl));
    }
    
    // Não tema acesso, manda pro Login
    if (!session && !publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // verifica se o ID da URL bate com o do Token
    if (pathname.includes('/dashboard') && session) {
        const userIdFromURL = pathname.split('/')[2];
        const { userId } = session as { userId: string }; 

        if (userIdFromURL !== userId) {
            const response = NextResponse.redirect(new URL('/login', req.nextUrl));
            response.cookies.delete('session'); 
            return response;
        }
    }

    return NextResponse.next();
}