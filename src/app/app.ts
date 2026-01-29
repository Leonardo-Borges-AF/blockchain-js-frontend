import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WalletComponent } from './components/wallet/wallet.component';
import { ChainComponent } from './components/chain/chain.component';
import { PendingComponent } from './components/pending/pending.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WalletComponent, ChainComponent, PendingComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = 'Blockchain';
}
