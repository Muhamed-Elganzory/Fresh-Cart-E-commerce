import {Component, inject, OnInit} from '@angular/core';
import {BrandsService} from '../../Services/brands.service';
import {Brands} from '../../Models/brands';
import {BrandCardComponent} from '../brand-card/brand-card.component';

@Component({
  selector: 'app-brands-list',
  imports: [
    BrandCardComponent
  ],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.css'
})
export class BrandsListComponent implements OnInit {
  private readonly brandsService: BrandsService = inject(BrandsService);
  brandsList:Brands [] = [];

  ngOnInit() {
    this.getBrands();
  }

  getBrands(): void{
    this.brandsService.getAllBrands().subscribe({
      next: (response: any): void => {
        this.brandsList = response.data;
      }
    })
  }
}
