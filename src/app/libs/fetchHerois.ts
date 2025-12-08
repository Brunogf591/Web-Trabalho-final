'use server';

import { retornaBD, armazenaBD } from "./conexaoBd";

interface CartaHeroi {
    id: string; 
    nome: string;
    imagem: string;
    atributos: {
        inteligencia: number;
        forca: number;
        velocidade: number;
        durabilidade: number;
        poder: number;
        combate: number;
    }
    userId: string; 
}

const nomeArquivo = 'cartas.json';

// Lista dos IDs, escolhidos pelos herois mais famosos e soma de atributos parecidos
const HEROISID = [
    70,
    149,
    204,
    213,
    222,
    230,
    265,
    306,
    332,
    346,
    413,
    414,
    423,
    620,
    644,
    655,
    659,
    680,
    717,
    720
];

export async function importarCartasParaUsuario(userId: string) {
    console.log(`Verificando cartas para o usuário: ${userId}...`);

    try {
        // Ler o banco atual
        const bancoAtual: CartaHeroi[] = await retornaBD(nomeArquivo);

        // Verificar se usuário já tem cartas
        const cartasDoUsuario = bancoAtual.filter(carta => carta.userId === userId);

        if (cartasDoUsuario.length > 0) {
            console.log("Usuário já possui cartas.");
            return { success: false, message: "Usuário já possui cartas." };
        }

        // Se não tem cartas, buscamos 
        console.log("Baixando da API...");
        
        const response = await fetch('https://akabab.github.io/superhero-api/api/all.json', {
            cache: 'force-cache' // Usa cache para ser mais rápido
        });

        if (!response.ok) throw new Error('Falha ao conectar na API de heróis');

        const todosHeroisAPI = await response.json();

        // Filtramos apenas os heróis da nossa lista de preferência
        const heroisEscolhidos = todosHeroisAPI.filter((h: any) => HEROISID.includes(h.id));

        // Mapeamos para o formato do nosso jogo adicionando o userId e gerando ID único
        const novasCartas: CartaHeroi[] = heroisEscolhidos.map((heroi: any) => ({
            id: crypto.randomUUID(), // gera um novo id
            nome: heroi.name,
            imagem: heroi.images.md,
            atributos: {
                inteligencia: heroi.powerstats.intelligence,
                forca: heroi.powerstats.strength,
                velocidade: heroi.powerstats.speed,
                durabilidade: heroi.powerstats.durability,
                poder: heroi.powerstats.power,
                combate: heroi.powerstats.combat,
            },
            userId: userId
        }));

        // Adicionamos as novas cartas ao banco existente 
        bancoAtual.push(...novasCartas);

        await armazenaBD(nomeArquivo, bancoAtual);
        
        console.log(`${novasCartas.length} cartas criadas para o usuário ${userId}.`);
        return { success: true, message: "Cartas importadas com sucesso." };

    } catch (error) {
        console.error("Erro na importação:", error);
        return { error: "Erro ao importar cartas." };
    }
}