# Card Game de Super-Heróis - Projeto Final Web

Este projeto é uma aplicação Fullstack desenvolvida como avaliação final da disciplina **XDES03 - Programação Web** da Universidade Federal de Itajubá (UNIFEI).

O sistema consiste em um gerenciador de cartas para um jogo estilo "Super Trunfo", permitindo cadastro de usuários, autenticação, importação de dados de API externa e um CRUD completo de cartas personalizadas.

A aplicação permite que cada usuário tenha sua própria coleção de cartas. Ao acessar pela primeira vez, o sistema consome uma API externa de Super-Heróis para criar um "deck inicial" para aquele usuário. A partir daí, o jogador pode criar novas cartas, editar atributos de heróis existentes ou excluir cartas do seu baralho.

### Funcionalidades Principais
* **Autenticação:** Login e Cadastro com validação de e-mail único, senha e criptografia (Bcrypt + JWT).
* **Integração com API Externa:** Importação automática de dados da [Superhero API](https://akabab.github.io/superhero-api/) para popular o banco de dados inicial.
* **CRUD:** Criação, Leitura, Atualização e Exclusão de cartas de heróis.
* **Persistência em Arquivos:** Uso de sistema de arquivos (JSON) simulando um banco de dados NoSQL.
* **Rotas Protegidas:** Sistema de Middleware para proteger áreas restritas contra acesso não autorizado.

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando uma arquitetura baseada em **Next.js**, unificando Frontend e Backend.

### Frontend 
* **Framework:** Next.js 15+ (App Router).
* **Linguagem:** TypeScript.
* **Estilização:** CSS Modules / Tailwind CSS.
* **Validação de Forms:** Zod.
* **Feedback Visual:** React Hot Toast.

### Backend
* **Server Actions:** Manipulação de dados no lado do servidor (Next.js).
* **Node.js:** Manipulação de arquivos (`fs/promises`) para persistência de dados.
* **Segurança:**
    * `bcrypt`: Hashing de senhas.
    * `jose`: Geração e validação de tokens JWT.

## Screenshots 

| Dashboard Principal |
|:---:|:---:|
| ![Dashboard](/screenshot1.png) |

| Listagem de Baralho |
|:---:|:---:|
|  ![Listagem](screenshot2.png) |


## 👥 Integrantes 

* **Bernardo Miguel Florenzano** - [GitHub](https://github.com/BernardoMFlorenzano)
* **Bruno Gonzales Flores** - [GitHub](https://github.com/Brunogf591)

---
*Projeto desenvolvido para a disciplina de Programação Web - UNIFEI.*