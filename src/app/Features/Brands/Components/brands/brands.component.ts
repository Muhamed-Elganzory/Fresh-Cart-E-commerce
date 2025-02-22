import { Component } from '@angular/core';
import {BrandsListComponent} from '../brands-list/brands-list.component';

@Component({
  selector: 'app-brands',
  imports: [
    BrandsListComponent
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {

}
