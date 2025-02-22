import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {testingEnvironment} from '../../../Environments/environment';
import {AuthService} from '../../../Core/Auth-Components/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly httpClient: HttpClient = inject (HttpClient);
  private readonly authService: AuthService = inject (AuthService);

  createCheckOut(cartID: string | null, shippingAddress:{details: string, phone: string, city: string}): Observable <any>{
    // cancel_url
    const returnURL = '?url=http://localhost:4200';
    return this.httpClient.post(testingEnvironment.baseURL + 'orders/checkout-session/' + cartID + returnURL,
      {
        shippingAddress: shippingAddress,
      }/*, {
        headers: {
          token: this.authService.getTokenCookie()!
        }}*/)
  }
}
