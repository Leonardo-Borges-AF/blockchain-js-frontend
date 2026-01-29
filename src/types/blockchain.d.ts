declare module 'elliptic' {
  interface KeyPair {
    getPublic(enc: string): string;
    getPrivate(enc: string): string;
    sign(hash: string, enc: string): { toDER(enc: string): string };
  }
  interface EC {
    new (curve: string): EC;
    genKeyPair(): KeyPair;
    keyFromPrivate(hex: string): KeyPair;
  }
  const elliptic: { ec: EC };
  export default elliptic;
}

declare module 'blockchain-src' {
  export class Transaction {
    constructor(fromAddress: string | null, toAddress: string, amount: number);
    signTransaction(signingKey: { getPublic: (enc: string) => string; sign: (hash: string, enc: string) => { toDER: (enc: string) => string } }): void;
  }
  export class Blockchain {
    chain: unknown[];
    pendingTransactions: unknown[];
    getAddressBalance(address: string): number;
    minePendingTransactions(miningRewardAddress: string): void;
    addTransaction(transaction: Transaction): void;
    isChainValid(): boolean;
  }
}

declare module 'blockchain' {
  export class Transaction {
    constructor(fromAddress: string | null, toAddress: string, amount: number);
    fromAddress: string | null;
    toAddress: string;
    amount: number;
    timestamp: number;
    signature?: string;
    calculateHash(): string;
    signTransaction(signingKey: { getPublic: (enc: string) => string; sign: (hash: string, enc: string) => { toDER: (enc: string) => string } }): void;
    isValid(): boolean;
  }

  export class Blockchain {
    chain: Array<{
      index: number;
      timestamp: number;
      transactions: Transaction[];
      previousHash: string;
      hash: string;
      nonce: number;
    }>;
    difficulty: number;
    pendingTransactions: Transaction[];
    miningReward: number;
    constructor();
    createGenesisBlock(): unknown;
    getLatestBlock(): { hash: string };
    minePendingTransactions(miningRewardAddress: string): void;
    addTransaction(transaction: Transaction): void;
    getAddressBalance(address: string): number;
    isChainValid(): boolean;
  }

  export function generateKeyPair(): {
    keyPair: { getPublic: (enc: string) => string; getPrivate: (enc: string) => string; sign: (hash: string, enc: string) => { toDER: (enc: string) => string } };
    publicKey: string;
    privateKey: string;
  };

  export function keyFromPrivate(privateKeyHex: string): {
    getPublic: (enc: string) => string;
    sign: (hash: string, enc: string) => { toDER: (enc: string) => string };
  };
}
