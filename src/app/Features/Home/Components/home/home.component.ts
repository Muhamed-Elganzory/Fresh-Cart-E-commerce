import {Component} from '@angular/core';
import {MainSliderComponent} from '../main-slider/main-slider.component';
import {CategorySliderComponent} from '../category-slider/category-slider.component';
import {ProductListComponent} from '../../../Products/Component/product-list/product-list.component';

@Component({
  selector: 'app-home',
  imports: [
    MainSliderComponent,
    CategorySliderComponent,
    ProductListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
