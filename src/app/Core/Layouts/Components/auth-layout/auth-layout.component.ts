import { Component } from '@angular/core';
import {NavBarComponent} from '../../../../Shared/Components/nav-bar/nav-bar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [
    NavBarComponent,
    RouterOutlet
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
