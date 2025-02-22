import {Component, Input} from '@angular/core';
import {Categories} from '../../Models/categories';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() categories!: Categories;
}
