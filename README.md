# Blockchain Frontend (Angular)

Front-end em Angular que consome o pacote [blockchain-js](https://github.com/Leonardo-Borges-AF/blockchain-js).

## Usar em outro repositório

1. Crie um novo repositório e inicialize um projeto Angular (ou copie esta pasta).
2. Instale o pacote da blockchain:
   ```bash
   npm i Leonardo-Borges-AF/blockchain-js
   ```
   O npm instalará pelo GitHub; o nome do pacote no projeto é `blockchain` (conforme `package.json` do repo blockchain-js).

3. No seu `package.json` deve aparecer:
   ```json
   "dependencies": {
     "blockchain": "github:Leonardo-Borges-AF/blockchain-js"
   }
   ```

4. Use no código:
   ```ts
   import { Blockchain, Transaction, generateKeyPair, keyFromPrivate } from 'blockchain';
   ```

## Desenvolvimento local (este monorepo)

Para usar o pacote local sem publicar no GitHub:

```bash
npm i file:../..
```

(ajuste o caminho relativo se a pasta do frontend estiver em outro lugar em relação ao `blockchain-js`)

## Comandos

- `npm start` — servidor de desenvolvimento (`ng serve`)
- `npm run build` — build de produção

## Funcionalidades

- **Carteira**: criar nova carteira ou carregar por chave privada; ver saldo; enviar transações.
- **Transações pendentes**: listar e minerar bloco (recompensa para a carteira carregada).
- **Blocos**: visualizar cadeia de blocos e transações; indicador de validade da cadeia.
