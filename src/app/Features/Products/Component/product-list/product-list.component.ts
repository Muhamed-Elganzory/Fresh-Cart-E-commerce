import {Component, inject, OnInit} from '@angular/core';
import {Products} from '../../Models/Products';
import {ProductsService} from '../../Services/products.service';
import {ProductCardComponent} from '../product-card/product-card.component';
import {CartService} from '../../../Cart/Services/cart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private readonly productsService: ProductsService = inject(ProductsService);
  private readonly cartService: CartService = inject(CartService);
  private readonly toastr: ToastrService = inject(ToastrService);

  dataOfProducts : Products [] = [];

  ngOnInit() {
    this.getProducts();
  }
  getProducts () {
    this.productsService.getProducts().subscribe({
      next: (response: any): void => {
        this.dataOfProducts = response.data;
      },
      error: (error: any): void => {
        console.log(error);
      },
      complete: (): void => {
        console.log('Product Is Complete');
      }
    })
  }

  addProductToCart(productID: string){
    this.cartService.addProductToCart(productID).subscribe({
      next: (response: any) => {
        console.log(response);
        this.showToasterSuccess(response.message);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  showToasterSuccess(message: string) {
    this.toastr.success(message, '', {
      progressBar: true,
      positionClass: 'toast-top-left',
      timeOut: 1500,
    });
  }
}
