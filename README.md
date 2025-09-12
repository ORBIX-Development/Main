# OrbiX

A Orbix desenvolve soluções tecnológicas de forma que otimize a comunicação entre profissionais e clientes em um âmbito clínico. O projeto tem como proposta o foco voltado para as necessidades de usuários que encontram adversidades no contato direto e aberto com profissionais ou como a dificuldade de deslocamento para consultas presenciais com esses profissionais. Desse modo, a proposta prioriza a eficiência e o conforto dos usuários.

A API em desenvolvimento, vai possibilitar a automação de processos de comunicação e a fácil integração com outras ferramentas da clínica, assegurando escalabilidade e flexibilidade técnica.

## Instalação e Inicialização

Execute esses comandos no terminal:

```
git clone https://github.com/ORBIX-Development/Main.git

npm install

```
Para executar a aplicação e inicializar o servidor, utilize o comando node app.js no terminal. 

---
Abra no seu Cliente de API as rotas abaixo:



|      Usuarios     |        Agendamento     |          Consulta    | Atendimento          |
|-------------------|:----------------------:|---------------------:|---------------------:|
|/usuarios          | /agendamento           | /consulta            |/atendimento          |
|/usuarios/id       | /agendamento/id        |   /consulta/id       |/atendimento/id       |
|/usuarios/insert   | /agendamento/insert    |  /consulta/insert    |/atendimento/insert   |
|/usuarios/insert/id| /agendamento/insert/id | /consulta/insert/id  |/atendimento/insert/id|
|/usuarios/del/id   | /agendamento/del/id    |   /consulta/del/id   |/atendimento/del/id   |


## Arquivos principais

* **connection.js:** Responsável por estabelecer a conexão com o banco de dados.
 Esse arquivo exporta a instância de conexão para que possa ser usada em toda a aplicação.

* **app.js:** Arquivo principal da API. Aqui ficam as **configurações globais** e a declaração das rotas principais.

* **Pasta (routes):** Contém os arquivos de rotas de cada tabela.
Cada rota é responsável por expor os endpoints de **CRUD (Create, Read, Update, Delete)**, garantindo a manipulação dos dados.




## Tecnologias e Dependêcias Utilizadas:

* Nodejs
* Mysql
* Mysql2
* Cors
* Express


