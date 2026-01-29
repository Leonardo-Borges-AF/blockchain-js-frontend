import { Injectable, signal, computed } from '@angular/core';
import {
  Blockchain,
  Transaction,
  generateKeyPair,
  keyFromPrivate,
} from 'blockchain';

export interface Wallet {
  publicKey: string;
  privateKey: string;
}

/** Key pair from generateKeyPair or loaded via keyFromPrivate (signing only, no getPrivate). */
type WalletKeyPair = {
  keyPair: { getPublic: (enc: string) => string; sign: (hash: string, enc: string) => { toDER: (enc: string) => string } };
  publicKey: string;
  privateKey: string;
};

@Injectable({ providedIn: 'root' })
export class BlockchainService {
  private blockchain = new Blockchain();
  private keyPair = signal<WalletKeyPair | null>(null);
  readonly wallets = signal<Wallet[]>([]);

  readonly wallet = computed(() => {
    const kp = this.keyPair();
    if (!kp) return null;
    return { publicKey: kp.publicKey, privateKey: kp.privateKey };
  });

  readonly balance = computed(() => {
    const w = this.wallet();
    if (!w) return 0;
    return this.blockchain.getAddressBalance(w.publicKey);
  });

  readonly chain = signal(this.blockchain.chain);
  readonly pendingTransactions = signal([...this.blockchain.pendingTransactions]);
  readonly isValid = signal(this.blockchain.isChainValid());

  getBalanceForAddress(address: string): number {
    return this.blockchain.getAddressBalance(address);
  }

  private addWalletToStore(w: Wallet): void {
    const list = this.wallets();
    if (list.some((x) => x.publicKey === w.publicKey)) return;
    this.wallets.set([...list, w]);
  }

  createWallet(): void {
    const kp = generateKeyPair();
    this.keyPair.set(kp);
    this.addWalletToStore({ publicKey: kp.publicKey, privateKey: kp.privateKey });
  }

  loadWallet(privateKeyHex: string): void {
    try {
      const kp = keyFromPrivate(privateKeyHex);
      const w: Wallet = {
        publicKey: kp.getPublic('hex'),
        privateKey: privateKeyHex,
      };
      this.keyPair.set({
        keyPair: kp,
        publicKey: w.publicKey,
        privateKey: w.privateKey,
      });
      this.addWalletToStore(w);
    } catch {
      throw new Error('Chave privada inválida');
    }
  }

  selectWallet(index: number): void {
    const list = this.wallets();
    const w = list[index];
    if (!w) return;
    this.loadWallet(w.privateKey);
  }

  sendTransaction(toAddress: string, amount: number): void {
    const kp = this.keyPair();
    if (!kp) throw new Error('Crie ou carregue uma carteira primeiro');
    const tx = new Transaction(kp.publicKey, toAddress, amount);
    tx.signTransaction(kp.keyPair);
    this.blockchain.addTransaction(tx);
    this.pendingTransactions.set([...this.blockchain.pendingTransactions]);
  }

  mineBlock(): void {
    const w = this.wallet();
    if (!w) throw new Error('Crie ou carregue uma carteira para minerar');
    this.blockchain.minePendingTransactions(w.publicKey);
    this.chain.set(this.blockchain.chain);
    this.pendingTransactions.set([...this.blockchain.pendingTransactions]);
    this.isValid.set(this.blockchain.isChainValid());
  }

  getChain(): typeof this.blockchain.chain {
    return this.blockchain.chain;
  }

  getPending(): Transaction[] {
    return this.blockchain.pendingTransactions;
  }
}
