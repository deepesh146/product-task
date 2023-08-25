import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WallethistoryComponent } from './wallethistory/wallethistory.component';
import { TopupComponent } from './topup/topup.component';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [
  {
    path : "",
    component : WallethistoryComponent
  },
  {
    path : "topup",
    component : TopupComponent
  },
  {
    path : "purchase",
    component : PurchaseComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
