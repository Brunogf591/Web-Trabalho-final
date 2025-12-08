'use server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'db'); 

async function getFilePath(fileName: string) {
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.mkdir(DB_PATH, { recursive: true });
    }
    return path.join(DB_PATH, fileName);
}

export async function retornaBD(fileName: string) {
    const filePath = await getFilePath(fileName);
    
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error: any) {
        // SE O ARQUIVO NÃO EXISTIR (ENOENT), RETORNA ARRAY VAZIO []
        if (error.code === 'ENOENT') {
            return []; 
        }
        throw error;
    }
}

export async function armazenaBD(fileName: string, data: any) {
    const filePath = await getFilePath(fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}