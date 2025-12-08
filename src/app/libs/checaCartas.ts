'use server';

import { retornaBD, armazenaBD } from "./conexaoBd";
import { importarCartasParaUsuario } from "./fetchHerois"; 
import fs from 'fs';
import path from 'path';

const ARQUIVO_CARTAS = 'cartas.json';

export async function obterCartasDoJogo(userId: string) {

    const caminhoArquivo = path.join(process.cwd(), ARQUIVO_CARTAS);

    // Se o arquivo não existe, criamos ele 
    if (!fs.existsSync(caminhoArquivo)) {
        console.log("Arquivo de cartas não encontrado. Iniciando importação da API");
        
        // Chama a função que vai na API e cria o arquivo
        await importarCartasParaUsuario(userId);
    } else {
        // Verificar se o arquivo está vazio 
        const dadosExistentes = await retornaBD(ARQUIVO_CARTAS);
        if (dadosExistentes.length === 0) {
            console.log("Arquivo existe mas está vazio. Importando...");
            await importarCartasParaUsuario(userId);
        }
    }

    // retornamos os dados
    console.log("Lendo cartas do banco de dados local");
    const cartas = await retornaBD(ARQUIVO_CARTAS);
    return cartas;
}