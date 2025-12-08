import { retornaBD } from "@/app/libs/conexaoBd";
import Carta from "@/app/ui/heroiCardCRUD"; 
import Link from "next/link";

export interface UserId {
    params: Promise<{userId: string}>;
}

export default async function PaginaCRUD({ params }: { params: { userId: string } }) {
    const { userId } = await params;
    
    const todasCartas = await retornaBD('cartas.json');
    // Filtra para mostrar as cartas deste usuário
    const minhasCartas = todasCartas.filter((c: any) => c.userId === userId);

    return (
        <div>
            <h2>Minha Coleção</h2>
            <Link href={`/dashboard/${userId}`}>Voltar</Link>
            <Link href={`/dashboard/${userId}/Cartas/Create`}>Criar Nova Carta</Link>
            
            <div>
                {minhasCartas.map((carta: any) => (
                    <Carta 
                        key={carta.id} 
                        {...carta}
                    />
                ))}
            </div>
        </div>
    )
}