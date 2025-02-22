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

  // Local Storage
  /*
    setTokenLocalStorage(token: string): void{
      localStorage.setItem('authToken', token);
    }
  */

  /*
    getTokenLocalStorage(): string | null {
      return localStorage.getItem('authToken');
    }
  */

  /*
    isAuthenticatedLocalStorage(): boolean {
      // let isAuthenticated: string | null = localStorage.getItem('authToken');

        // if (isAuthenticated) {
          // return true;
        // }
        // return false;

    // return !!isAuthenticated;
    // return !!localStorage.getItem('authToken');
    // }
 */

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
      next: (response: any): any => {
        if(response.message == 'verified')
          return true;
      },
      error: (error: any): any => {
        console.log(error.error.message);
        if(error.status == 'fail')
        return false;
      }
    })
  }

  isAuthenticatedCookie(): boolean {
    // let isAuthenticated: string | null = this.cookieServices.get('authToken');
    /*
      if(isAuthenticated){
        return true;
      }
      return false;
    */
    // return !!isAuthenticated;
    // return !!this.cookieServices.get('authToken');

    if(this.cookieServices.get('authToken')) {
      console.log("isAuthenticatedCookie");
        return true;
    }
    return false;
  }

  logOut(): void {
    this.cookieServices.delete('authToken');
    this.router.navigate(['/login']);
  }

  decode(){
    try {
      const decoded  = jwtDecode(this.cookieServices.get('authToken')!);
    }catch {
      this.logOut();
    }
  }
}

/*
npm list --depth=0

@angular-devkit/build-angular@0.1101.2
├── @angular/animations@19.1.6
├── @angular/cli@19.1.7
├── @angular/common@19.1.6
├── @angular/compiler-cli@19.1.6
├── @angular/compiler@19.1.6
├── @angular/core@19.1.6
├── @angular/forms@19.1.6
├── @angular/platform-browser-dynamic@19.1.6
├── @angular/platform-browser@19.1.6
├── @angular/platform-server@19.1.6
├── @angular/router@19.1.6
├── @angular/ssr@19.1.7
├── @fortawesome/fontawesome-free@6.7.2
├── @tailwindcss/postcss@4.0.6
├── @types/express@4.17.21
├── @types/jasmine@5.1.6
├── @types/node@18.19.76
├── express@4.21.2
├── flowbite@3.1.2
├── jasmine-core@5.4.0
├── jwt-decode@4.0.0
├── karma-chrome-launcher@3.2.0
├── karma-coverage@2.2.1
├── karma-jasmine-html-reporter@2.1.0
├── karma-jasmine@5.1.0
├── karma@6.4.4
├── ngx-cookie-service@19.1.0
├── ngx-owl-carousel-o@19.0.0
├── postcss@8.5.2
├── rxjs@7.8.1
├── tailwindcss@4.0.6
├── tslib@2.8.1
├── typescript@5.6.3
└── zone.js@0.15.0

 */
