# Life+ BACKEND

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=222)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![REST API](https://img.shields.io/badge/REST-API-green?style=for-the-badge)](#rest-api)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

<p align="left">
  <a href="https://www.instagram.com/orbixdevelopment/#" target="_blank">
    <img src="https://avatars.githubusercontent.com/u/214011883?s=400&u=7e5f301745d14392b31a6d57c4e460968c4d95ab&v=4" width="80" />
    <br>
    <b>Instagram OrbiX Development</b>
  </a>
</p>

---

## Sobre o projeto

O **Life+** é o backend desenvolvido pela OrbiX para a solução de alta recorrência de consultas de retorno para pessoas com doenças crônicas. O projeto visa diminuir barreiras comunicativas e logísticas entre pacientes e profissionais de saúde, facilitando a gestão de atendimentos, agendamentos e arquivos médicos.

## Tecnologias Utilizadas

- **JavaScript** (Node.js)
- **REST API**
- **Docker**
- **Arquitetura Router-Driven**

## Arquitetura

O Life+ utiliza uma **arquitetura router-driven**, em que a estrutura principal do backend é organizada a partir dos arquivos de rotas, cada um responsável por um domínio do sistema. Isso facilita o desenvolvimento colaborativo, a manutenção e amplia a escalabilidade da aplicação. Cada rota principal pode acionar controladores, serviços ou middlewares especializados para tratamento das requisições.

## Rotas principais

- **/usuarios**  
  Gerenciamento de usuários da plataforma (cadastro, autenticação, atualização, listagem, etc).

- **/consultas**  
  Operações relacionadas às consultas médicas — agendamento, atualização, histórico, cancelamento, etc.

- **/agendamentos**  
  Gestão de agendas e marcação de horários, integração com profissionais e pacientes para organizar os compromissos.

- **/atendimentos**  
  Controle dos atendimentos efetivos realizados, registro de informações clínicas e encaminhamentos.

> Todas as rotas seguem o padrão REST e retornam respostas em JSON.

## Funcionalidades

- Cadastro, autenticação e administração de usuários (pacientes, médicos e gestores)
- Agendamento e gerenciamento de consultas
- Controle dos atendimentos, com registro e acompanhamento
- Histórico de consultas e atendimentos para pacientes crônicos
- Facilitação da comunicação e notificações entre profissionais e pacientes
- Suporte ao fluxo de trabalho da equipe de saúde

## Como rodar localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ORBIX-Development/Main.git
   cd Main
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente (.env):**
   - Exemplo de uso: informações do banco, segredos de autenticação, etc.

4. **Inicie o servidor:**
   ```bash
   npm start
   ```

5. **Execução com Docker:**
   ```bash
   docker build -t lifeplus-backend .
   docker run -p 3000:3000 lifeplus-backend
   ```

## Observações

- O projeto segue boa separação de responsabilidades via módulos de rota.
- Recomenda-se o uso de ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para explorar e testar os endpoints.
- Para dúvidas, sugestões ou contato com a equipe, acesse o [Instagram da OrbiX Development](https://www.instagram.com/orbixdevelopment/#).

---
