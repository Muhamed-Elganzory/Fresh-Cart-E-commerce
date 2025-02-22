import { Component } from '@angular/core';
import {CategoriesListComponent} from '../categories-list/categories-list.component';

@Component({
  selector: 'app-categories',
  imports: [
    CategoriesListComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
