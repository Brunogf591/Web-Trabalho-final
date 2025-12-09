import { obterCartasDoJogo } from "@/app/libs/checaCartas";
import Link from "next/link";

import '@/app/styles/Lobby.css';

export interface UserId {
    params: Promise<{userId: string}>;
}

export default async function MainPagina({params}: UserId){
    const { userId } = await params;

    console.log("Verificando cartas...");

    await obterCartasDoJogo(userId);

    return(
        <div id="Pags">
            <h1>Bem-vindo, Jogador!</h1>
            <div className="PagOpt">
                <Link href={`/dashboard/${userId}/Cartas`}>
                    Gerenciar Cartas
                </Link>
                <Link href={`/dashboard/${userId}/Jogar`}>
                    Jogar Partida
                </Link>
            </div>
            <div id="manual">
                <p>Nesse jogo você terá cartas com quatro atributos cada.</p>
                <p>As cartas serão escolhidas aleatoriamente do seu deck.</p>
                <p>Você pode criar, editar ou excluir cartas.</p>
                <p>A diferença entre o valor do atributo da carta do jogador e do rival será dada como dano na vida de quem teve o menor atributo.</p>
                <p id="FUN"> Divirta-se.</p>
            </div>
        </div>
    )
}