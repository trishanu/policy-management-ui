import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/CustomerApiService';
import { Customer } from '..//../models/customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-customer-dashboard',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.scss',
})

export class CustomerDashboard implements OnInit {
  customers: Customer[] = [];

  searchId!: number;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {

    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });

  }

  searchCustomer() {

    if (!this.searchId) {
      this.loadCustomers();
      return;
    }

    this.customerService.getCustomerById(this.searchId).subscribe({

      next: (customer) => {

        this.customers = [customer];

      },

      error: () => {

        alert("Customer not found");

        this.customers = [];

      }

    });

  }

}
