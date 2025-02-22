import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../Models/cart';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() product: Product = {} as Product;
  @Output() removeCartItem: EventEmitter <string> = new EventEmitter <string> ();
  @Output() updateProductQuantity: EventEmitter <{ productID: string, count: number }> = new EventEmitter <{ productID: string, count: number }> ();

  onRemoveCart(productID: string): void{
    this.removeCartItem.emit(productID);
  }


  onUpdateQuantity (productID: string, count: number): void {
    this.updateProductQuantity.emit({productID, count});
  }
}
