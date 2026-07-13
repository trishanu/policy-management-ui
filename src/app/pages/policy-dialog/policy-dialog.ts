import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Policy } from '../../models/policy';
import { FormsModule } from '@angular/forms';
import { PolicyApi } from '../../core/services/policy-api';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../core/services/CustomerApiService';
import { Customer } from '../../models/customer';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  selector: 'app-policy-dialog',
  templateUrl: './policy-dialog.html',
  styleUrls: ['./policy-dialog.css']
})
export class PolicyDialog implements OnInit {

  policy: Policy = {} as Policy;
  customers: Customer[] = [];
  mode: 'create' | 'edit' = 'create';

  constructor(
    private service: PolicyApi,
    private dialogRef: MatDialogRef<PolicyDialog>,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
    if (this.data?.id) {

      this.mode = 'edit';

      this.loadPolicy(this.data.id);

    }

  }
  customerChanged(): void {

    const customer = this.customers.find(
      c => c.id === this.policy.customerId
    );

    if (customer) {

      this.policy.customerNumber = customer.customerNumber;

      this.policy.customerName =
        customer.firstName + ' ' + customer.lastName;

    }

  }
  loadCustomers(): void {

    this.customerService.getCustomers().subscribe({

      next: (response) => {

        this.customers = response;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  loadPolicy(id: number): void {

    this.service.getPolicyById(id).subscribe({

      next: (response: any) => {

        this.policy = response;

      },

      error: (error: any) => {

        console.error(error);

        alert('Unable to load policy details');

      }

    });

  }

  savePolicy(): void {

    if (this.mode === 'create') {

      this.service.createPolicy(this.policy).subscribe({

        next: () => {

          alert('Policy Created Successfully');

          this.dialogRef.close(true);

        },

        error: (error: any) => {

          console.error(error);

          alert('Unable to create policy');

        }

      });

    } else {

      this.service.updatePolicy(this.policy.id!, this.policy).subscribe({

        next: () => {

          alert('Policy Updated Successfully');

          this.dialogRef.close(true);

        },

        error: (error: any) => {

          console.error(error);

          alert('Unable to update policy');

        }

      });

    }

  }

  close(): void {

    this.dialogRef.close();

  }

}