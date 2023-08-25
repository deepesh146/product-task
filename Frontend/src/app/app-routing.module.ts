import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { LayouthomeComponent } from './pages/layout/layouthome/layouthome.component';
import { LoginnewComponent } from './pages/loginnew/loginnew.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const routes: Routes = [
  // { path: '', component: LoginnewComponent },
  { path: 'login', component: LoginnewComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: "pages",
    canActivate: [AuthGuard],
    component: LayouthomeComponent,
    children : [
      {
        path : "products",
        loadChildren: () =>
        import("./pages/products/products.module").then((m) => m.ProductsModule)
      },
      {
        path : "wallet",
        loadChildren: () =>
        import("./pages/wallet/wallet.module").then((m) => m.WalletModule)
      }
    ]
  
  },
  { path: "", redirectTo: 'login',pathMatch:'full' },
  // otherwise redirect to home
  { path: '**', redirectTo: 'not-found' }
  // { path: 'login', component: LoginComponent },
  // { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  // {
  //   path: 'pages',
  //   // canActivate: [AuthGuard],
  //   children: [
  //     { path: 'products', component: ProductListComponent },
  //     { path: 'create-product', component: CreateProductComponent },
  //     { path: 'edit-product', component: ProductListComponent }
  //   ]
  // },
  // we can't use above routes because of module creation import export errors.

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
