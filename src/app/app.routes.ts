import { Routes } from '@angular/router';
import {AuthLayoutComponent} from './Core/Layouts/Components/auth-layout/auth-layout.component';
import {UserLayoutComponent} from './Core/Layouts/Components/user-layout/user-layout.component';
import {SignInComponent} from './Core/Auth-Components/Components/sign-in/sign-in.component';
import {SignUpComponent} from './Core/Auth-Components/Components/sign-up/sign-up.component';
import {HomeComponent} from './Features/Home/Components/home/home.component';
import {ProductDetailsComponent} from './Features/Products/Component/product-details/product-details.component';
import {ProductsComponent} from './Features/Products/Component/products/products.component';
import {CategoriesComponent} from './Features/Categories/Components/categories/categories.component';
import {BrandsComponent} from './Features/Brands/Components/brands/brands.component';
import {NotFoundComponent} from './Shared/Components/not-found/not-found.component';
import {authGuard} from './Core/Guards/auth.guard';
import {loggedGuard} from './Core/Guards/loggedGuard';
import {CartListComponent} from './Features/Cart/Components/cart-list/cart-list.component';
import {CheckOutComponent} from './Features/Orders/Components/check-out/check-out.component';
import {OrdersComponent} from './Features/Orders/Components/orders/orders.component';

export const routes: Routes = [
  {path: '', component: AuthLayoutComponent, canActivate: [loggedGuard], children: [
      {path:'', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: SignInComponent, title: 'Login'},
      {path: 'register', component: SignUpComponent, title: 'Sign Up'},
    ]
  },
  {path: '', component: UserLayoutComponent, canActivate: [authGuard], children: [
      {path:'', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent, title: 'Home'},
      {path: 'products', component: ProductsComponent, title: 'Products'},
      {path: 'product-details/:id', component: ProductDetailsComponent, title: 'Product Details'},
      {path: 'categories', component: CategoriesComponent, title: 'Categories'},
      {path: 'brands', component: BrandsComponent, title: 'Brands'},
      {path: 'cart', component: CartListComponent, title: 'Cart'},
      {path: 'checkout/:id', component: CheckOutComponent, title: 'Check Out'},
      {path: 'allorders', component: OrdersComponent, title: 'Orders'},
    ]
  },
  {path: '**', component: NotFoundComponent}
];

// terav@mailinator.com
// Pa$$w0rd!

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjlmYjIxMWY0ZjllNmMwOTQwZDFjOCIsIm5hbWUiOiJRdWFtYXIgTW9ycm93Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDAyNDE3MDgsImV4cCI6MTc0ODAxNzcwOH0.nq4UNTDAdTy-7KfJTGIXKvs4ObpUedRGPz_ND-uHAxI
