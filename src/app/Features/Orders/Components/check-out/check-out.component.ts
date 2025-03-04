import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessagesComponent } from '../../../../Shared/Components/validation-messages/validation-messages.component';
import { AlertComponent } from '../../../../Shared/Components/alert/alert.component';
import { NgClass } from '@angular/common';
import { OrderService } from '../../Services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-out',
  imports: [
    ReactiveFormsModule,
    ValidationMessagesComponent,
    AlertComponent,
    NgClass
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit {
  private readonly orderService: OrderService = inject (OrderService);
  private readonly activatedRoute: ActivatedRoute = inject (ActivatedRoute);
  private readonly toastr: ToastrService = inject (ToastrService);

  checkOutForm: FormGroup = new FormGroup ({});
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  token: string = '';
  cartID: string | null = ''

  payForm(): void {
    this.checkOutForm = new FormGroup({
      details: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^(?:\+20|0)?1[0125]\d{8}$/)]),
      city: new FormControl(null, [Validators.required]),
    });
  }

  submitForm(): void {
    this.isLoading = true;
    if (this.checkOutForm.valid || this.isLoading) {
      this.orderService.createCheckOut(this.cartID, this.checkOutForm.value).subscribe({
        next: (response: any): void => {
          this.isLoading = true;
          this.toastr.success(response.status);
          this.checkOutForm.reset();
          open(response.session.url, '_balnk');
        },
      })
    }
  }

  ngOnInit() {
    this.payForm();
    this.getCartID();
  }

  getCartID(): void{
    this.activatedRoute.paramMap.subscribe({
      next: (cartID: any) => {
        this.cartID = cartID.get('id');
        console.log(this.cartID);
      }
    })
  }
}
