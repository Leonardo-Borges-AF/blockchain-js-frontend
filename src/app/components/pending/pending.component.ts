import { Component, inject } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-pending',
  standalone: true,
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.scss',
})
export class PendingComponent {
  readonly blockchain = inject(BlockchainService);
  readonly pendingTransactions = this.blockchain.pendingTransactions;
  readonly wallet = this.blockchain.wallet;

  mine(): void {
    try {
      this.blockchain.mineBlock();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Erro ao minerar');
    }
  }
}
