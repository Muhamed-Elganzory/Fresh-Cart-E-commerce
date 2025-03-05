import {Component, inject, OnInit} from '@angular/core';
import {AlertComponent} from "../../../../Shared/Components/alert/alert.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { ValidationMessagesComponent } from "../../../../Shared/Components/validation-messages/validation-messages.component";
import {AuthService} from '../../Services/auth.service';
import {NgClass} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [
    AlertComponent,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    NgClass,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  signIn!: FormGroup;
  isLoading: boolean = false;
  successMessage: string= '';
  errorMessage: string= '';
  isShowPassword: boolean = false;
  token: string = '';

  signUpForm(): void{
    this.signIn = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    });
  }

  showPassword(){
    this.isShowPassword = !this.isShowPassword;
  }

  submitForm(): void {
    this.isLoading = true;
    if(this.signIn.valid) {
      this.authService.signIn(this.signIn.value).subscribe({
        next: (response: any): void =>{
          this.successMessage = response.message;
          this.token= response.token;
        },
        error: (error: any): void  => {
          this.errorMessage = error.error.message;
          this.isLoading = false;
          this.successMessage = '';
        },
        complete: (): void  => {
          this.isLoading = false;

          this.authService.verifyToken(this.token).subscribe({
            next: (): void => {
              this.authService.setTokenCookie(this.token);
              this.goToHome();
            },
          });
        }
      })
    } else {
      this.isLoading = false;
      this.signIn.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.signUpForm();
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}

// zukoci@mailinator.com
// Pa$$w0rd!
