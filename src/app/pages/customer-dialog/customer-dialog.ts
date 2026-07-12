
import { Component, EventEmitter, Output, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '..//../core/services/CustomerApiService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-customer-dialog',
  imports: [FormsModule],
  templateUrl: './customer-dialog.html',
  styleUrl: './customer-dialog.css',
})
export class CustomerDialog implements OnInit {
  @Output()
  dialogClose = new EventEmitter();

  customer: any = {};
  mode: any;

  constructor(
    private service: CustomerService,
    private dialogRef: MatDialogRef<CustomerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.mode = this.data?.mode ?? 'create';

    if (this.mode !== 'create' && this.data?.id) {

      this.loadCustomer(this.data.id);

    }
  }

  onClose(): void {

    this.dialogRef.close();

  }
  loadCustomer(id: number): void {

    this.service.getCustomerById(id).subscribe({

      next: (response) => {

        this.customer = response;

      },

      error: (error) => {

        console.error(error);

        alert('Unable to load customer details');

      }

    });

  }
  saveCustomer(): void {

    if (this.mode === 'create') {

      this.service.createCustomer(this.customer).subscribe({

        next: () => {

          alert('Customer Created Successfully');

          this.dialogRef.close(true);

        }

      });

    } else {

      this.service.updateCustomer(this.customer, String(this.customer.id)).subscribe({

        next: () => {

          alert('Customer Updated Successfully');

          this.dialogRef.close(true);

        }

      });

    }


  }



}
