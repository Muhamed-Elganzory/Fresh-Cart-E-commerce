import { Routes } from '@angular/router';
import {authGuard} from './Core/Guards/auth.guard';
import {loggedGuard} from './Core/Guards/loggedGuard';


export const routes: Routes = [
  {path: '', loadComponent: () => import('./Core/Layouts/Components/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent), canActivate: [loggedGuard], children: [
      {path:'', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', loadComponent: ()=> import('./Core/Auth/Components/sign-in/sign-in.component').then((c) =>  c.SignInComponent), title: 'Login'},
      {path: 'register', loadComponent: () => import('./Core/Auth/Components/sign-up/sign-up.component').then((c) => c.SignUpComponent), title: 'Sign Up'},
    ]
  },
  {path: '', loadComponent: () => import('./Core/Layouts/Components/user-layout/user-layout.component').then((c) => c.UserLayoutComponent), canActivate: [authGuard], children: [
      {path:'', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', loadComponent: () => import('./Features/Home/Components/home/home.component').then((c) => c.HomeComponent), title: 'Home'},
      {path: 'products', loadComponent: () => import('./Features/Products/Component/products/products.component').then((c) => c.ProductsComponent), title: 'Products'},
      {path: 'product-details/:id', loadComponent: () => import('./Features/Products/Component/product-details/product-details.component').then((c) => c.ProductDetailsComponent), title: 'Product Details'},
      {path: 'categories', loadComponent: () => import('./Features/Categories/Components/categories/categories.component').then((c) => c.CategoriesComponent), title: 'Categories'},
      {path: 'brands', loadComponent: () => import('./Features/Brands/Components/brands/brands.component').then((c) => c.BrandsComponent), title: 'Brands'},
      {path: 'cart', loadComponent: () => import('./Features/Cart/Components/cart-list/cart-list.component').then((c) => c.CartListComponent), title: 'Cart'},
      {path: 'checkout/:id', loadComponent: () => import('./Features/Orders/Components/check-out/check-out.component').then((c) => c.CheckOutComponent), title: 'Check Out'},
      {path: 'allorders', loadComponent: () => import('./Features/Orders/Components/orders/orders.component').then((c) => c.OrdersComponent), title: 'Orders'},
    ]
  },
  {path: '**', loadComponent: () => import('./Shared/Components/not-found/not-found.component').then((c) => c.NotFoundComponent), title: 'Not Found'}
];

// terav@mailinator.com
// Pa$$w0rd!

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjlmYjIxMWY0ZjllNmMwOTQwZDFjOCIsIm5hbWUiOiJRdWFtYXIgTW9ycm93Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDAyNDE3MDgsImV4cCI6MTc0ODAxNzcwOH0.nq4UNTDAdTy-7KfJTGIXKvs4ObpUedRGPz_ND-uHAxI
