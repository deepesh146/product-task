import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { MatButtonModule } from '@angular/material/button';
import { ViewProductComponent } from './view-product/view-product.component';

@NgModule({
  declarations: [
    ProductListComponent,
    CreateProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    ViewProductComponent
  ],
  imports: [
   ReactiveFormsModule,
    HttpClientModule,
    ProductsRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    RxReactiveFormsModule, 
    
  ],
  exports : [
    MatSidenavModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    RxReactiveFormsModule, 
    CreateProductComponent,
    ProductListComponent
  ]
})
export class ProductsModule { }
