import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Brands} from '../Models/brands';
import {Observable} from 'rxjs';
import {testingEnvironment} from '../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly httpClient: HttpClient = inject (HttpClient);

  getAllBrands(): Observable <any> {
    return this.httpClient.get(testingEnvironment.baseURL + 'brands');
  }
}
