import Image from "next/image";
import "@/app/styles/Carta.css";
import Link from "next/link";
import {retornaBD,armazenaBD} from "../libs/conexaoBd";
import { redirect } from "next/navigation";

const bd : string = 'cartas.json';

// Definição do tipo da Carta 
export interface CartaHeroi {
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


export default function Carta(props: CartaHeroi)
{

    const deleteCarta = async () => {
        'use server';
        const carta = await retornaBD(bd);
        const cartaARemover =  carta.findIndex((p) => {
            return (p.id === props.id && props.userId === p.userId)
        });

        carta.splice(cartaARemover,1);

        await armazenaBD(bd, carta);
        
        redirect(`/dashboard/${props.userId}/Cartas`);
        
        
    }

    return(
        <div id="character">
            <p id="name">{props.nome}</p>
            <Image
                src={props.imagem}
                width={320}
                height={480}
                alt={`Imagem do personagem ${props.nome}`}
            />
            <form action="" id="values">
                <button id="intelligence"><span className="key">Inteligência:</span><span className="value">{props.atributos.inteligencia}</span></button>
                <button id="strenght"><span className="key">Força:</span><span className="value">{props.atributos.forca}</span></button>
                <button id="speed"><span className="key">Velocidade:</span><span className="value">{props.atributos.velocidade}</span></button>
                <button id="durability"><span className="key">Durabilidade:</span><span className="value">{props.atributos.durabilidade}</span></button>
                <button id="power"><span className="key">Poder:</span><span className="value">{props.atributos.poder}</span></button>
                <button id="combat"><span className="key">Combate:</span><span className="value">{props.atributos.combate}</span></button>
            </form>

            <div id="Changes">
                <button>
                   <Link href={`/dashboard/${props.userId}/Cartas/Edit/${props.id}`} id="btn-edit">Editar</Link> 
                </button>
                <form action={deleteCarta}>
                    <button id="btn-delete">Deletar</button>
                </form>
            </div>
        </div>
    )

}