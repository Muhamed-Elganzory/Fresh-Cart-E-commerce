import {Component, inject, OnInit} from '@angular/core';
import {CategoriesService} from '../../Services/categories.service';
import {Categories} from '../../Models/categories';
import {CategoryCardComponent} from '../category-card/category-card.component';

@Component({
  selector: 'app-categories-list',
  imports: [
    CategoryCardComponent,

  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit {
  private readonly categoriesServices: CategoriesService = inject(CategoriesService);

  categoriesList: Categories [] = [];

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesServices.getALlCategories().subscribe({
      next: (response: any): void => {
        this.categoriesList = response.data;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
