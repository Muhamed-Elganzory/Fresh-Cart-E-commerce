import {Component, inject, OnInit} from '@angular/core';
import {CartService} from '../../Services/cart.service';
import {Cart} from '../../Models/cart';
import {CartItemComponent} from '../cart-item/cart-item.component';
import {RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cart-list',
  imports: [
    CartItemComponent,
    RouterLink
  ],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit {
  private readonly cartService: CartService = inject(CartService);
  private readonly toastr: ToastrService = inject(ToastrService);
  cartDetails: Cart = {} as Cart;

  isLoading = false;

  ngOnInit() {
    this.loadCartList();
  }

  loadCartList() : void{
    this.cartService.getLoggedUserCart().subscribe({
      next: (response: any) => {
        this.cartDetails = response;
        this.isLoading = true;
      }
    })
  }

  removeCartItem(productID: string): void{
    this.cartService.removeCart(productID).subscribe({
      next: (response: any) => {
        console.log(response);
        this.cartDetails = response;
      }
    })
  }

  updateQuantity(productID: string, count: number): void {
    this.cartService.UpdateCartQuantity(productID, count).subscribe({
      next: (response: any) => {
        this.cartDetails = response;
        this.showToasterSuccess('Successfully updated cart!');
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

  clearCart(): void{
    this.cartService.clearCart().subscribe({
      next: (response: any) => {
        if(response.message == 'success'){
          this.loadCartList()
        }
      }
    })
  }
}
