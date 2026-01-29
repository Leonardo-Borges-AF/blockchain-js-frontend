import { Component, inject } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-chain',
  standalone: true,
  templateUrl: './chain.component.html',
  styleUrl: './chain.component.scss',
})
export class ChainComponent {
  readonly blockchain = inject(BlockchainService);
  readonly chain = this.blockchain.chain;
  readonly isValid = this.blockchain.isValid;
}
