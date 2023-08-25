import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  {
    path : "",
    component : ProductListComponent
  },
  {
    path : "create-product",
    component : CreateProductComponent
  },
  {
    path : "edit-product/:id",
    component : EditProductComponent
  },
  {
    path : "view-product/:id",
    component : ViewProductComponent
  },
  
  // {
  //   path : '**',
  //   redirectTo : "",
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
