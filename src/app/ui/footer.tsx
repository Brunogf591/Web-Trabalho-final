import "@/app/styles/Footer.css";

export default function Footer(){
    return(
        <footer className='footer'>
            {/*span abaixo usado para alinhar a estilização do footer, não pensei em algo para colocar nele*/}
            <span id="space"></span>
            <span id="authors">
                            <p style={{textAlign: "center"}}>Feito com 🎮 por:</p>
            <ul>
                <li><a href="https://github.com/BernardoMFlorenzano" target="_blank">Bernardo</a></li>
                <li><a href="https://github.com/Brunogf591" target="_blank">Bruno</a></li>
            </ul>
            </span>
            <span id="Git-Proj">
                <a target="_blank" href="https://github.com/Brunogf591/Web-Trabalho-final">Git do projeto</a>
            </span>
        </footer>
    );
}