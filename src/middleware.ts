import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Importe o jose diretamente aqui

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

// ATENÇÃO: Use 'export default' aqui para corrigir o erro de Build
export default async function middleware(req: NextRequest) {
    
    const pathname = req.nextUrl.pathname;

    // 1. Em Middleware, pegamos o cookie diretamente da requisição (não use next/headers)
    const sessionCookie = req.cookies.get('session')?.value;
    
    // 2. Validar a sessão
    // Se não tiver cookie, session será null. Se tiver, tentamos validar.
    const session = sessionCookie ? await verifyToken(sessionCookie) : null;

    // Lógica de Redirecionamento
    
    // A. Usuário logado tentando acessar rota pública (ex: login) -> Manda pro Dashboard
    if (publicRoutes.includes(pathname) && session) {
        return NextResponse.redirect(new URL(`/dashboard/${session.userId}`, req.nextUrl));
    }
    
    // B. Usuário NÃO logado tentando acessar rota protegida -> Manda pro Login
    if (!session && !publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // C. Proteção extra do Dashboard (verificar se o ID da URL bate com o do Token)
    if (pathname.includes('/dashboard') && session) {
        const userIdFromURL = pathname.split('/')[2];
        const { userId } = session as { userId: string }; // Type casting simples

        if (userIdFromURL !== userId) {
            // Se tentar acessar o dashboard de outro usuário, forçamos logout/login
            // Nota: No middleware não podemos deletar o cookie facilmente no navegador do usuário
            // sem retornar uma resposta. O jeito mais fácil é redirecionar para login.
            // Opcional: Você pode criar uma rota API de logout para limpar o cookie.
            const response = NextResponse.redirect(new URL('/login', req.nextUrl));
            response.cookies.delete('session'); // Força a deleção no redirecionamento
            return response;
        }
    }

    return NextResponse.next();
}