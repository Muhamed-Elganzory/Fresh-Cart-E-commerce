import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from '../../Services/products.service';
import {Products} from '../../Models/Products';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {isDate} from 'node:util/types';
import {CartService} from '../../../Cart/Services/cart.service';
import {ToastrService} from 'ngx-toastr';
import {Cart, Product} from '../../../Cart/Models/cart';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private readonly productsService: ProductsService = inject (ProductsService);
  private readonly activatedRoute: ActivatedRoute = inject (ActivatedRoute);
  private readonly cartServices: CartService = inject (CartService);
  private readonly toastr: ToastrService = inject(ToastrService);

  isChangeImage: boolean = false;

  catchProductID: any;
  productDetails: Products = {} as Products;
  isFavorite: boolean = false;
  countOfProducts: number = 0;

  getProductDetails(productId: string): void {
    this.productsService.getProductDetails(productId).subscribe({
      next: (response: any): void => {
        this.productDetails = response.data;
      }
    })
  }

  getProductID(): Subscription{
    return this.activatedRoute.paramMap.subscribe({
      next: (url: any): void=> {
        this.catchProductID = url.get('id');
      }
    })
  }

  ngOnInit(): void {
    this.getProductID();
    this.getProductDetails(this.catchProductID);
  }

  changeImage(imageLink: any){
    this.isChangeImage = imageLink;
  }

  isFavoriteMark(): void{
    this.isFavorite = !this.isFavorite;
  }

  addProductCart(productId: string): void {
    this.cartServices.addProductToCart(productId).subscribe({
      next: (response: any): void =>{
        this.showToasterSuccess(response.message);
      }
    })
  }

  showToasterSuccess(message: string): void {
    this.toastr.success(message, '', {
      progressBar: true,
      positionClass: 'toast-top-left',
      timeOut: 1500,
    });
  }
}
