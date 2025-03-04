import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {testingEnvironment} from '../../../Environments/environment';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient: HttpClient = inject(HttpClient);
  private readonly cookieServices: CookieService = inject(CookieService);
  private readonly router: Router = inject(Router);
  // messageVerifyToken: any;

  signUp(userData: any): Observable <any> {
    return this.httpClient.post(testingEnvironment.baseURL + 'auth/signup', userData);
  }

  signIn(userData: any): Observable <any> {
    return this.httpClient.post(testingEnvironment.baseURL + 'auth/signin', userData);
  }

  // Cookies
  setTokenCookie(token: string): void{
    this.cookieServices.set('authToken', token);
  }

  getTokenCookie(): string | null{
    return this.cookieServices.get('authToken');
  }

  verifyToken(token: string): Observable <any> {
    return this.httpClient.get(testingEnvironment.baseURL + 'auth/verifyToken', {
      headers:{
        token: token,
      }
    });
  }

  isChangeToken(): any{
    this.verifyToken(this.cookieServices.get('authToken')).subscribe({
      error: (error: any): any => {
        if(error.error.statusMsg == 'fail'){
          this.logOut()
        }
      }
    })
  }

  isAuthenticatedCookie(): boolean {
    return !!this.cookieServices.get('authToken');
  }

  logOut(): void {
    this.cookieServices.delete('authToken');
    this.router.navigate(['/login']);
  }

  decodeToken(): void{
    try {
      const decoded  = jwtDecode(this.cookieServices.get('authToken')!);
    } catch {
      this.logOut();
    }
  }
}
