import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {testingEnvironment} from '../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private httpClient: HttpClient = inject(HttpClient);

  getALlCategories(): Observable <any>{
    return this.httpClient.get(testingEnvironment.baseURL + 'categories');
  }
}
