import { obterCartasDoJogo } from "@/app/libs/checaCartas";
import Link from "next/link";

export interface UserId {
    params: Promise<{userId: string}>;
}

export default async function MainPagina({params}: UserId){
    const { userId } = await params;

    console.log("Verificando cartas...");

    await obterCartasDoJogo(userId);

    return(
        <div>
            <h1>Bem-vindo, Jogador!</h1>
            <div>
                <Link href={`/dashboard/${userId}/Cartas`}>
                    Gerenciar Cartas
                </Link>
                <Link href={`/dashboard/${userId}/Jogar`}>
                    Jogar Partida
                </Link>
            </div>
        </div>
    )
}