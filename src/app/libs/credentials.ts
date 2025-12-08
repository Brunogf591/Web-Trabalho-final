'use server';

import { redirect } from "next/navigation";
import {retornaBD,armazenaBD} from "./conexaoBd";

import bcrypt from "bcrypt"; 
import { LoginCredentials } from "../(auth)/login/page";
import { createSessionToken } from "./session";

const userDBFile = 'usuariosBd.json';

interface User {
    id: string;
    email: string;
    password: string;
}

export async function createUser(data: LoginCredentials){

    const email = data.email;
    const password = data.password;

    const passwordCrypt = await bcrypt.hash(password,10);

    const novoUser: User = {
        id: crypto.randomUUID(),
        email,
        password: passwordCrypt
    }

    const users = (await retornaBD(userDBFile)) as User[];

    for(const user of users)
    {
        if(user.email === email){
            return {error: 'Usuário ou senha incorretos'};
        }
    }
    users.push(novoUser);
    armazenaBD(userDBFile,users);
    return {success: 'Usuário Criado com Sucesso'}

}

export async function validateCredentials(data: LoginCredentials){

    const email = data.email;
    const password = data.password;

    const usuariosDB = (await retornaBD(userDBFile)) as User[];

    const user = usuariosDB.find(user => user.email === email);

    if(!user)
        return {error: 'Usuário não encontrado'};
    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch)
    {
        await createSessionToken(user.id, user.email);
        console.log('vai redirecionar');
        redirect(`/dashboard/${user.id}`);
    }
    else{
        return {error: 'Usuario ou senhas incorretos'}
    }

}