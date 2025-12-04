'use server';

//Para ler arquivos com nextjs
import { readFileSync,  writeFileSync} from 'fs';
import path from "path";

export async function retornaBD(arquivo: string): Promise<Array<any>>
{
    const dbPath = path.join(process.cwd(),'src','db',arquivo);
    const dados = readFileSync(dbPath,'utf-8');
    
    return JSON.parse(dados);
}

export async function armazenaBD(arquivo: string, dados: any)
{
    const dbPath = path.join(process.cwd(),'src','db',arquivo);
    
    writeFileSync(dbPath, JSON.stringify(dados,null,2));
}