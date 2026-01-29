# Blockchain Frontend

Front-end Angular para visualização e interação com uma blockchain educacional, consumindo o pacote [blockchain-js](https://github.com/Leonardo-Borges-AF/blockchain-js).

## Tecnologias

- **Angular** 21
- **TypeScript** 5.9
- **SCSS**
- **blockchain-js** (pacote npm via GitHub)

## Pré-requisitos

- **Node.js** (v18+ recomendado)
- **npm** 11.x (ou compatível)

## Instalação

```bash
git clone <url-do-repositorio>
cd blockchain-frontend
npm install
```

## Desenvolvimento

```bash
npm start
```

A aplicação sobe em `http://localhost:4200`.

## Build de produção

```bash
npm run build
```

Artefatos em `dist/blockchain-frontend/browser` (ou conforme `angular.json`).

## Scripts disponíveis

| Comando           | Descrição                          |
|-------------------|------------------------------------|
| `npm start`       | Servidor de desenvolvimento        |
| `npm run build`   | Build de produção                  |
| `npm run watch`   | Build em modo watch (development)  |
| `npm test`        | Executa testes                     |
| `npm run ng`      | CLI Angular (ex.: `ng generate`)   |

## Estrutura do projeto

```
src/
├── app/
│   ├── components/
│   │   ├── chain/       # Visualização da cadeia de blocos
│   │   ├── pending/     # Transações pendentes e mineração
│   │   └── wallet/      # Carteiras e envio de transações
│   ├── services/
│   │   └── blockchain.service.ts   # Lógica da blockchain e carteiras
│   ├── app.ts, app.html, app.routes.ts, app.config.ts
│   └── app.scss
├── types/
│   └── blockchain.d.ts  # Declarações para o pacote blockchain
├── index.html
├── main.ts
└── styles.scss
```

## Funcionalidades

### Carteira
- **Nova carteira**: gera par de chaves (pública/privada) e adiciona à lista.
- **Carregar carteira**: insere chave privada em hex e seleciona a carteira.
- **Selecionar**: escolher uma carteira já criada/carregada.
- **Saldo**: exibe o saldo do endereço da carteira atual.
- **Enviar**: envia valor para outro endereço (transação assinada e adicionada às pendentes).

### Transações pendentes
- Lista todas as transações ainda não incluídas em um bloco.
- **Minerar bloco**: com uma carteira carregada, minera um bloco com as pendentes e credita a recompensa de mineração para o endereço da carteira.

### Blocos
- Exibe a cadeia de blocos (índice, hash, transações).
- Indicador de **cadeia válida** ou **cadeia inválida** (integridade dos hashes e assinaturas).

## Uso do pacote blockchain-js

### Em outro repositório (via GitHub)

```bash
npm i Leonardo-Borges-AF/blockchain-js
```

No `package.json`:

```json
"dependencies": {
  "blockchain": "github:Leonardo-Borges-AF/blockchain-js"
}
```

No código:

```ts
import { Blockchain, Transaction, generateKeyPair, keyFromPrivate } from 'blockchain';
```

### Desenvolvimento local (monorepo / pacote local)

Para usar o pacote local sem publicar no GitHub:

```bash
npm i file:../caminho/para/blockchain-js
```

Ajuste o caminho relativo conforme a pasta do frontend em relação ao repositório `blockchain-js`.

## Configuração

- **Estilo**: SCSS (global em `src/styles.scss`, componentes com `styleUrl`).
- **Prefixo de componentes**: `app` (ex.: `app-wallet`, `app-chain`).
- **Editor**: `.editorconfig` e Prettier (configurado em `package.json`).

## Licença

Projeto privado. Consulte o repositório para informações de licença.
