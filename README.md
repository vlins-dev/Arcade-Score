# Arcade Score

Aplicação full stack para registrar pontuações de jogadores, exibir um ranking dos melhores resultados e consultar estatísticas individuais.

O projeto é composto por:
- Frontend em Angular
- Backend em ASP.NET Core
- Armazenamento em memória para as pontuações registradas

## Funcionalidades

- Cadastro de pontuação de um jogador
- Ranking dos top 10 jogadores
- Estatísticas por jogador, incluindo:
  - partidas jogadas
  - média de pontuação
  - maior e menor pontuação
  - vezes que bateu recorde
  - tempo de atividade
- API REST documentada com Swagger

## Stack tecnológica

- Angular 15
- TypeScript
- ASP.NET Core 9
- C#
- Swagger / OpenAPI
- CORS configurado para comunicação local entre frontend e backend

## Estrutura do projeto

```text
Arcade-Score/
├── Backend/                 # API REST e lógica de negócio
│   ├── Controllers/         # Endpoints da aplicação
│   ├── Models/              # Entidades e DTOs
│   ├── Services/           # Regras de negócio e armazenamento em memória
│   ├── Program.cs          # Configuração da API
│   └── Properties/          # Configuração de execução local
├── Frontend/               # Aplicação Angular
│   ├── src/                # Código da interface
│   ├── package.json        # Dependências e scripts do Angular
│   └── angular.json        # Configuração do projeto Angular
├── README.md               # Documentação principal do projeto
└── .gitignore
```

## Pré-requisitos

Antes de rodar o projeto, verifique se você tem instalados:

- Node.js e npm
- .NET SDK 9
- Git

Se você quiser garantir que as versões corretas estejam disponíveis no ambiente antes de iniciar o projeto, execute este comando:

```bash
winget install --id Microsoft.DotNet.SDK.9 --source winget
winget install --id OpenJS.NodeJS.LTS --source winget
winget install --id Git.Git --source winget
```

Depois, confirme as versões com:

```bash
dotnet --version
node --version
npm --version
git --version
```

## Como executar

### 1) Backend

Abra o terminal na pasta `Backend` e execute:

```bash
dotnet restore
dotnet run
```

A API será iniciada em:

- http://localhost:5078
- [Front-End API](https://localhost:7128) (quando habilitado no profile de desenvolvimento)

O Swagger pode ser acessado em:

- [Back-End API](http://localhost:5078/swagger)

### 2) Frontend

Abra outro terminal na pasta `Frontend` e execute:

```bash
npm install
npm start
```

O app Angular será iniciado em:

- http://localhost:4200

## Endpoints da API

### Registrar pontuação

- Método: `POST`
- URL: `/api/scores`

Exemplo de body:

```json
{
  "jogador": "Jogador 1",
  "pontos": 1200,
  "dataPartida": "2026-10-23T15:30:00"
}
```

### Obter ranking

- Método: `GET`
- URL: `/api/scores/ranking`

Retorna os top 10 melhores resultados.

### Obter estatísticas de um jogador

- Método: `GET`
- URL: `/api/scores/estatisticas/{jogador}`

Exemplo:

```bash
GET /api/scores/estatisticas/Jogador%201
```

## Observações importantes

- As pontuações ficam armazenadas em memória, então ao reiniciar a API os dados são apagados.
- A aplicação frontend foi configurada para acessar a API no endereço local do backend.
- A política CORS permite somente solicitações vindas de `http://localhost:4200`.

## Como contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Faça suas alterações
4. Abra um pull request com uma descrição clara do que foi modificado

## Licença

Este projeto foi desenvolvido para fins de estudo e demonstração.
