import { armazenaBD, retornaBD } from "@/app/libs/conexaoBd";
import "@/app/styles/NewCard.css";
import { CartaHeroi } from "@/app/ui/heroiCardCRUD";
import { redirect } from "next/navigation";
import { UserId } from "../page";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const arquivo = 'cartas.json';


export default async function CriaCarta({params}: UserId){
    
    const {userId} = await params;


    const addCartaAction = async (formData: FormData) => {
        'use server';
        const novaCarta : CartaHeroi = {
            id: crypto.randomUUID(),
            nome: formData.get('nome') as string,
            imagem : formData.get('imagem') as string,
            atributos : {
                inteligencia: Number(formData.get('inteligencia') || 0),
                forca: Number(formData.get('forca') || 0),
                velocidade: Number(formData.get('velocidade') || 0),
                durabilidade: Number(formData.get('durabilidade') || 0),
                poder: Number(formData.get('poder') || 0),
                combate: Number(formData.get('combate') || 0)
            },
            userId
        }

        try {
            const cartasDb = await retornaBD(arquivo);
            cartasDb.push(novaCarta);
            await armazenaBD(arquivo,cartasDb);
        } catch (error) {
            console.log(error);
        }

        redirect(`/dashboard/${userId}/Cartas`);
        
    }
   


    return(
        <section className="">
            <h2>Inserir Nova Carta</h2>
            <form action={addCartaAction} className="FormCreate">
                <section className="">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" name="nome" placeholder="Ex: Batman" required />
                </section>
                
                <section className="">
                    <label htmlFor="imagem">URL da Imagem</label>
                    <input type="text" id="imagem" name="imagem" placeholder="https://..." required />
                </section>

                <div className="">
                    <section className="">
                        <label htmlFor="inteligencia">Inteligência</label>
                        <input type="number" id="inteligencia" name="inteligencia" placeholder="0-100" required />
                    </section>

                    <section className="">
                        <label htmlFor="forca">Força</label>
                        <input type="number" id="forca" name="forca" placeholder="0-100" required />
                    </section>

                    <section className="">
                        <label htmlFor="velocidade">Velocidade</label>
                        <input type="number" id="velocidade" name="velocidade" placeholder="0-100" required />
                    </section>

                    <section className="">
                        <label htmlFor="durabilidade">Durabilidade</label>
                        <input type="number" id="durabilidade" name="durabilidade" placeholder="0-100" required />
                    </section>

                    <section className="">
                        <label htmlFor="poder">Poder</label>
                        <input type="number" id="poder" name="poder" placeholder="0-100" required />
                    </section>

                    <section className="">
                        <label htmlFor="combate">Combate</label>
                        <input type="number" id="combate" name="combate" placeholder="0-100" required />
                    </section>
                </div>
                
                <button type="submit" className="btn-salvar">Adicionar Carta</button>
                <button>
                    <Link href={`/dashboard/${userId}/Cartas`} className="btn-cancelar">Cancelar</Link>
                </button>
            </form>
        </section>
    );

}