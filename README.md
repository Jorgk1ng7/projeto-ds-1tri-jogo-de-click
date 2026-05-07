# projeto-ds-1tri-jogo-de-click

parte da API

Consiste em uma API REST para um jogo de click, integrada a um aplicativo mobile em React Native.

O sistema permite criar jogadores e registrar cliques, armazenando os dados de forma persistente.

Tecnologias Utilizadas
Node.js
Express
React Native (Expo)
Python (pytest)
JSON (persistência de dados)
Postman
Funcionalidades
Criar jogador
Registrar cliques
Listar jogadores
Persistência de dados em arquivo JSON
Testes automatizados da API
Integração com aplicativo mobile

Testes Automatizados
python -m pytest
 Endpoints da API
Método	Rota	Descrição
GET	/clicks	Lista jogadores
POST	/clicks	Cria jogador
PUT	/clicks//click	Registra clique

Testes

Foram implementados testes automatizados utilizando pytest e requests, simulando requisições HTTP para validar o funcionamento da API.

Persistência de Dados

Os dados são armazenados em um arquivo data.json, garantindo que não sejam perdidos ao reiniciar o servidor.

Arquitetura

O projeto segue o padrão de arquitetura em camadas:

Routes → Controllers → Services → Dados (JSON)

Isso permite melhor organização, manutenção e escalabilidade.

Integração

A API foi testada com:

Postman
Scripts de requisição HTTP
Aplicativo mobile em React Native

Garantindo compatibilidade com diferentes clientes.
a seguir temos algumas imagens dos testes que eu fiz com a API

postman
<img width="1374" height="955" alt="image" src="https://github.com/user-attachments/assets/71c989b3-5702-4e09-9114-f47d1e44b4d4" />

dentro do VSCODE 
<img width="1173" height="115" alt="image" src="https://github.com/user-attachments/assets/521160a4-260e-46cc-828f-8c0d0d0d4194" />

<img width="1242" height="240" alt="image" src="https://github.com/user-attachments/assets/a2c443d6-94f2-4bc1-9a25-798146440c42" />




Parte do login


Bom nessa parte foi feito a mudança da imagem para a logo do site, e a parte do login com espaços pra colocar email e a senha logicamente funcional porem nao ira salvar o progresso, e tambem foi feito a parte que direciona o usuario direto para o jogo.

<img width="600" height="240" alt="image" src="mobile\assets\images\Captura de tela 2026-05-07 102622.png" />