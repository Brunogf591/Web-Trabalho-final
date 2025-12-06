import superIcon from 'public/icon-super.png';
import Image from 'next/image'

import "@/app/styles/Header.css";
import React from 'react';

export default async function Header(){

    return(
        <header>
            <Image className='img-icon' src={superIcon} alt='Ícone com silhueta de super-herói'/>
            <nav>
                <ul className='Sites'>
                <li><a href="https://akabab.github.io/superhero-api/api/" target='_blank'>API Super-Heróis</a></li>
                <li><a href="https://www.marvel.com/" target='_blank'>Página Oficial Marvel</a></li>
                <li><a href="https://www.dc.com/" target='_blank'>Página Oficial DC</a></li>
                </ul>
            </nav>
        </header>
    )
}