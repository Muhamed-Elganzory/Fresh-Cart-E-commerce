import {Component, inject, Input, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../Core/Auth-Components/Services/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  @Input() layOut: string= '';
  private readonly authService: AuthService = inject(AuthService);
  // private readonly cookieService : CookieService = inject(CookieService);

  ngOnInit() {
    // if(this.cookieService.get('authToken'))
      // this.authService.decode();
  }

  logOut(){
    this.authService.logOut();
  }
}
