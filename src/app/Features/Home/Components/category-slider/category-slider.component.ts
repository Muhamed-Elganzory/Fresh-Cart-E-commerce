import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from '../../../Products/Services/products.service';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {Category} from '../../../Products/Models/Products';

@Component({
  selector: 'app-category-slider',
  imports: [
    CarouselModule
  ],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent implements OnInit {

  private readonly products = inject(ProductsService);

  dataOfCategories: Category [] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

  getCategories() {
    this.products.getCategories().subscribe({
      next: (response: any) => {
        this.dataOfCategories = response.data;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Categories Is Complete');
      }
    })
  }

  ngOnInit() {
    this.getCategories();
  }
}
