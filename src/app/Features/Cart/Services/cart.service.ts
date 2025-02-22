import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {testingEnvironment} from '../../../Environments/environment';
import {AuthService} from '../../../Core/Auth-Components/Services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly authServices: AuthService = inject(AuthService);

  addProductToCart(productID: string): Observable<any>{
    return this.httpClient.post(testingEnvironment.baseURL + 'cart',
      {
        productId: productID
      }/*, {
        headers: {
          token: this.authService.getTokenCookie()!
      }}*/)
  }

  UpdateCartQuantity(productID: string, count: number): Observable<any>{
    return this.httpClient.put(testingEnvironment.baseURL + 'cart/' + productID,
      {
          count: count
      },/*, {
        headers: {
          token: this.authService.getTokenCookie()!
      }}*/)
  }

  getLoggedUserCart(): Observable <any>{
    return this.httpClient.get(testingEnvironment.baseURL + 'cart',
      /*, {
        headers: {
          token: this.authService.getTokenCookie()!
      }}*/)
  }

  removeCart(productID: string): Observable <any>{
    return this.httpClient.delete(testingEnvironment.baseURL + 'cart/' + productID,
      /*, {
        headers: {
          token: this.authService.getTokenCookie()!
      }}*/)
  }

  clearCart(): Observable <any>{
    return this.httpClient.delete(testingEnvironment.baseURL + 'cart',
      /*, {
        headers: {
          token: this.authService.getTokenCookie()!
      }}*/)
  }
}
