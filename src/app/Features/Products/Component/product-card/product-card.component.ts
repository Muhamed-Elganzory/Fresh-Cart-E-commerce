import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Products} from '../../Models/Products';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Products;
  @Output() addToCart: EventEmitter <string> =  new EventEmitter <string> ();

  isFavorite: boolean = false;

  isFavoriteMark(): void{
    this.isFavorite = !this.isFavorite;
  }

  onAddToCart(productID: string){
    this.addToCart.emit(productID);
  }

}
