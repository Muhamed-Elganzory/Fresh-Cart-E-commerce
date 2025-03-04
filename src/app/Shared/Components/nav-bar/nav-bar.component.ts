import {Component, inject, Input, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../Core/Auth/Services/auth.service';

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

  ngOnInit(): void {
    this.authService.isChangeToken();
    // this.authService.decodeToken();
  }
  logOut(){
    this.authService.logOut();
  }
}
