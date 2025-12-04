export interface UserId {
    params: Promise<{userId: string}>;
}

export default async function MainPagina({params}: UserId){
    return(
        <div>
            <h2>Pagina principal</h2>
        </div>
    )
}