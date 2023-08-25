import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { TopupComponent } from './topup/topup.component';
import { WallethistoryComponent } from './wallethistory/wallethistory.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ProductsModule } from '../products/products.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PurchaseProductsComponent } from './purchase-products/purchase-products.component';
import {
  MatAutocompleteModule
} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    TopupComponent,
    WallethistoryComponent,
    PurchaseComponent,
    PurchaseProductsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,

    WalletRoutingModule,
    ProductsModule
  ]
})
export class WalletModule { }
