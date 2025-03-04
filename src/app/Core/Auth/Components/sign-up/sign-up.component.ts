import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../Services/auth.service';
import {ValidationMessagesComponent} from '../../../../Shared/Components/validation-messages/validation-messages.component';
import {NgClass} from '@angular/common';
import {AlertComponent} from '../../../../Shared/Components/alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    ValidationMessagesComponent,
    NgClass,
    AlertComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  signUp!: FormGroup;
  isLoading: boolean = false;
  successMessage: string= '';
  errorMessage: string= '';
  isShowPassword: boolean = false;
  isShowConfirmPassword: boolean = false;

  signUpForm(): void{
    this.signUp = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      rePassword: new FormControl('', [Validators.required]),
    }, { validators: this.passwordMatch });
  }

  showPassword(){
    this.isShowPassword = !this.isShowPassword;
  }

  showConfirmPassword(){
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }

  passwordMatch(control: AbstractControl) {
    let password: any = control.get('password')?.value;
    let confirmPassword: any = control.get('rePassword')?.value;

    if (password === confirmPassword) {
      return null;
    }else{
      return {
        mismatch: true
      }
    }
  }

  submitForm(): void{
    this.isLoading = true;
    if(this.signUp.valid){
      this.authService.signUp(this.signUp.value).subscribe({
        next: (response: any): void =>{
          this.successMessage = response.message;
        },
        error: (error: any): void  => {
          this.errorMessage = error.error.message;
          this.isLoading = false;
          this.successMessage = '';
        },
        complete: (): void  => {
          console.log('SignUp complete');
          this.isLoading = false;
          this.goToLogin();
        }
      })
    } else{
      this.isLoading = false;
      this.signUp.get('rePassword')?.setValue('');
      this.signUp.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.signUpForm();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
