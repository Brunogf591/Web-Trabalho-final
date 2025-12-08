
import {retornaBD,armazenaBD} from "@/app/libs/conexaoBd";
//import "@/app/styles/.css";
import { CartaHeroi } from "@/app/ui/heroiCardCRUD";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

const arquivo = 'cartas.json';

interface EditCartaHeroi{
    params: Promise<{id: string, userId: string}>;
}

export default async function EditaCarta({params}: EditCartaHeroi){

    const {id, userId} = await params;
    
    const cartasBD = await retornaBD(arquivo);

    const cartaAEditar: CartaHeroi = cartasBD.find((p: CartaHeroi) => p.id === id);
    const cartaAEditarIndex: number = cartasBD.findIndex((p: any) => p.id === id && p.userId === userId);

    const atualizaCarta = async (formData : FormData) => {
        'use server';

        const cartaAtualizada: CartaHeroi = {
            id,
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

        cartasBD.splice(cartaAEditarIndex,1,cartaAtualizada);

        await armazenaBD(arquivo,cartasBD);

        redirect(`/dashboard/${userId}/Cartas`);

    }


    return (
        <div className="">
            <h2 className="">Editando: {cartaAEditar.nome}</h2>
            <form action={atualizaCarta} className="">
                <div>
                    {cartaAEditar.imagem && (
                        <Image 
                            src={cartaAEditar.imagem}
                            alt={`Imagem de ${cartaAEditar.nome}`}
                            width={150}
                            height={200}
                            style={{ objectFit: "contain" }}
                        />
                    )}
                </div>

                <section className="">
                    <label htmlFor="nome">Nome</label>
                    <input type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome da Carta"
                        defaultValue={cartaAEditar.nome} // Puxa o valor atual
                        required
                    />
                </section>

                <section className="">
                    <label htmlFor="imagem">URL da Imagem</label>
                    <input type="text"
                        id="imagem"
                        name="imagem" 
                        placeholder="Link da imagem"
                        defaultValue={cartaAEditar.imagem}
                        required
                    />
                </section>

                <div className="">
                    <section className="">
                        <label htmlFor="inteligencia">Inteligência</label>
                        <input type="number" id="inteligencia" name="inteligencia" 
                               defaultValue={cartaAEditar.atributos.inteligencia} required />
                    </section>
                    
                    <section className="">
                        <label htmlFor="forca">Força</label>
                        <input type="number" id="forca" name="forca" 
                               defaultValue={cartaAEditar.atributos.forca} required />
                    </section>

                    <section className="">
                        <label htmlFor="velocidade">Velocidade</label>
                        <input type="number" id="velocidade" name="velocidade" 
                               defaultValue={cartaAEditar.atributos.velocidade} required />
                    </section>

                    <section className="">
                        <label htmlFor="durabilidade">Durabilidade</label>
                        <input type="number" id="durabilidade" name="durabilidade" 
                               defaultValue={cartaAEditar.atributos.durabilidade} required />
                    </section>

                    <section className="">
                        <label htmlFor="poder">Poder</label>
                        <input type="number" id="poder" name="poder" 
                               defaultValue={cartaAEditar.atributos.poder} required />
                    </section>

                    <section className="">
                        <label htmlFor="combate">Combate</label>
                        <input type="number" id="combate" name="combate" 
                               defaultValue={cartaAEditar.atributos.combate} required />
                    </section>
                </div>

                <div className="">
                    <button type="submit" className="btn-salvar">Salvar Alterações</button>
                    <Link href={`/dashboard/${userId}/Cartas`} className="btn-cancelar">Cancelar</Link>
                </div>

            </form>
        </div>
    )

}