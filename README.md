# Trybe Futebol Clube


## Do que se trata esse projeto


Este projeto foi desenvolvido durante minha formação no módulo de back-end na [Trybe](https://www.betrybe.com/). Esta e uma aplicação full-stack a proposta de ser um site de informações de jogos de futebol. A aplicação tem dois tipos de acesso, o usuário e possível ver a tabela de jogos, tabela de classificação, ver jogos em andamento e finalizados e seu placar, filtrar por jogos em casa ou fora. O administrador todos os poderes de usuário e mais como adicionar partidas, alterar o placar e finalizar partidas em andamento. Como projeto de módulo back-end da Trybe fui responsável por toda configuração de Dockerfile para usar os serviços de back-end, front-end e banco de dados de forma simultânea. Fui responsável por toda a construção do back-end da aplicação utilizando as mais diversas ferramentas para dar funcionalidade ao front-end.

## Principais linguagens e tecnologias utilizadas


- **TypeScript**: sua versatilidade contribui diretamente para o bom funcionamento da API, garantindo que informações são transmitidas e recebidas seguindo um padrão.
- **POO**: trouxe muitos benefícios em termos de organização, manutenção, escalabilidade e clareza do código.
- **Docker**: fácil configuração e trouxe grandes benefícios ao trabalhar com banco de dados relacional.
- **Sequelize**: fácil configuração e trouxe grandes benefícios ao trabalhar com banco de dados relacional.
- **JWT**: simplicidade no uso e grande utilidade no uso do payload para passar informações não sensíveis.
- **bcript**: A segurança de dados e muito importante e esta ferramenta cumpre muito bem seu proposito facilitando a manipulação de dados sensíveis.
- **express**: muito útil pela facilidade de gerenciar rotas e facilidade de integração com outras ferramentas.


## Instruções de instalação e uso


### Pré-requisitos


- **Node.js** (versão 18.3.1 ou superior)
- **npm** (versão 10.8.1)
- **Docker** (versão 27.0.3)


### Instalação


#### Docker


1. Baixe e instale o Docker do site oficial:[Docker](https://www.docker.com/get-started/)


2. Verifique a instalação do Docker:
   ```bash
   docker --version
   docker-compose --version
   ```


#### Ubuntu


1. Atualize o sistema e instale Node.js e npm:


   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```


2. Clone o repositório:


   ```bash
   git clone https://github.com/Henriquekrs/trybe-futebol-clube
   ```


3. Navegue até o diretório do projeto:


   ```bash
   cd nome-do-repositório
   ```


4. Instale as dependências:
   ```bash
   npm install
   ```


#### Windows


1. Baixe e instale o Node.js e npm do site oficial: [Node.js](https://nodejs.org/)


2. Clone o repositório:


   ```bash
   git clone https://github.com/Henriquekrs/trybe-futebol-clube
   ```


3. Navegue até o diretório do projeto:


   ```cmd
   cd nome-do-repositório
   ```


4. Instale as dependências:
   ```cmd
   npm install
   ```


#### macOS


1. Instale o Homebrew (se ainda não tiver):


   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```


2. Use o Homebrew para instalar Node.js e npm:


   ```bash
   brew install node
   ```


3. Clone o repositório:


   ```bash
   git clone https://github.com/Henriquekrs/trybe-futebol-clube
   ```


4. Navegue até o diretório do projeto:


   ```bash
   cd nome-do-repositório
   ```


5. Instale as dependências:
   ```bash
   npm install
   ```


### Uso


Passos para iniciar e usar o projeto:


1. Inicie o servidor de desenvolvimento na raiz do projeto:
   ```bash
   npm run compose:up
   ```


- Esses serviços irão inicializar um contêiner chamado `app_frontend`, `app_backend` e outro chamado `db`;


### Exemplos de uso


- Esta e uma aplicação full-stack logo o mesmo tem uma interface que podemos vizualizar e interagir, basta entrar no navegador e acessar a rota:
  ```bash
  http://localhost:3000
  ```

- Experimente fazer login como administrador e usuario:
  ```bash
  admin@admin.com
  secret_admin

  user@user.com
  secret_user
  ```

  
## Contato


Se você tiver alguma dúvida, entre em contato:


- **Gustavo Henrique**
- E-mail: [ghrduarte@hotmail.com](mailto:ghrduarte@hotmail.com)
- GitHub: [henriquekrs](https://github.com/Henriquekrs)
