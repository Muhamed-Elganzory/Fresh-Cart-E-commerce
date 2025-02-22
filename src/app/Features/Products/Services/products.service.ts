import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {testingEnvironment} from '../../../Environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
  private readonly httpClient: HttpClient = inject(HttpClient);

  getCategories(): Observable <any> {
    return this.httpClient.get(testingEnvironment.baseURL + 'categories');
  }

  getProducts(): Observable <any> {
    return this.httpClient.get(testingEnvironment.baseURL + 'products');
  }

  getProductDetails(productId: string): Observable <any> {
    return this.httpClient.get(testingEnvironment.baseURL + 'products/' + productId);
  }
}
