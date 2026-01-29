import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent {
  private blockchain = inject(BlockchainService);

  readonly wallet = this.blockchain.wallet;
  readonly balance = this.blockchain.balance;
  readonly wallets = this.blockchain.wallets;
  readonly viewMode = signal<'list' | 'detail'>('list');

  toAddress = '';
  amount = 0;
  privateKeyInput = '';
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  getBalanceForAddress(address: string): number {
    return this.blockchain.getBalanceForAddress(address);
  }

  createWallet(): void {
    this.blockchain.createWallet();
    this.error.set(null);
    this.success.set('Carteira criada! Guarde sua chave privada em local seguro.');
    this.viewMode.set('detail');
  }

  loadWallet(): void {
    this.error.set(null);
    this.success.set(null);
    try {
      this.blockchain.loadWallet(this.privateKeyInput.trim());
      this.success.set('Carteira carregada.');
      this.privateKeyInput = '';
      this.viewMode.set('detail');
    } catch (e) {
      this.error.set('Chave privada inválida.');
    }
  }

  selectWallet(index: number): void {
    this.blockchain.selectWallet(index);
    this.error.set(null);
    this.success.set(null);
    this.viewMode.set('detail');
  }

  backToList(): void {
    this.viewMode.set('list');
  }

  send(): void {
    this.error.set(null);
    this.success.set(null);
    if (!this.toAddress.trim() || this.amount <= 0) {
      this.error.set('Preencha endereço e valor válido.');
      return;
    }
    try {
      this.blockchain.sendTransaction(this.toAddress.trim(), this.amount);
      this.success.set('Transação adicionada. Aguardando mineração.');
      this.toAddress = '';
      this.amount = 0;
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Erro ao enviar.');
    }
  }
}
