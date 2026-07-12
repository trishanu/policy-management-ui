import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Customer } from '../../models/customer';
import { CustomerService } from '../../core/services/CustomerApiService';
import { CustomerDialog } from '../customer-dialog/customer-dialog';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  templateUrl: './customer-dashboard.html',
  styleUrls: ['./customer-dashboard.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ]
})
export class CustomerDashboard
  implements OnInit, AfterViewInit {

  customers: Customer[] = [];

  dataSource = new MatTableDataSource<Customer>();

  displayedColumns: string[] = [
    'id',
    'customerNumber',
    'name',
    'email',
    'phone',
    'actions'
  ];

  searchText = '';

  activeCustomers = 0;
  newCustomers = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCustomers(): void {

    this.customerService.getCustomers().subscribe({

      next: (data) => {

        this.customers = data;

        this.dataSource.data = data;

        this.activeCustomers = data.length;

        this.newCustomers = data.length;

      },

      error: () => {

        this.showMessage('Unable to load customers');

      }

    });

  }

  searchCustomer(): void {

  if (!this.searchText) {

    this.loadCustomers();

    return;

  }

  this.customerService.getCustomerById(Number(this.searchText)).subscribe({

    next: (customer) => {

      this.customers = [customer];

      this.dataSource.data = [customer];

      this.activeCustomers = 1;

      this.newCustomers = 1;

    },

    error: (error) => {

      console.error(error);

      this.customers = [];

      this.dataSource.data = [];

      this.showMessage('Customer not found');

    }

  });

}

  openCustomerDialog(): void {

  const dialogRef = this.dialog.open(CustomerDialog, {

    width: '700px',
    disableClose: true,
    data: {
      mode: 'create'
    }


  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {

      this.loadCustomers();

      this.showMessage('Customer saved successfully');

    }

  });
}

  viewCustomer(customer: Customer): void {

    this.dialog.open(CustomerDialog, {

      width: '700px',

      data: {
        id: customer.id,
        mode: 'view'
      }

    });

  }

  editCustomer(customer: Customer): void {

    const dialogRef = this.dialog.open(CustomerDialog, {

      width: '700px',

      data: {
         id: customer.id,
        mode: 'edit'
      }

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadCustomers();

        this.showMessage('Customer updated successfully');

      }

    });

  }

  deleteCustomer(id?: number): void {

  if (!id) {
    return;
  }

  if (!confirm('Are you sure you want to delete this customer?')) {
    return;
  }

  this.customerService.deleteCustomer(id).subscribe({

    next: () => {

      this.showMessage('Customer deleted successfully');

      // Refresh customer list
      this.loadCustomers();

    },

    error: (err) => {

      console.error(err);

      this.showMessage('Unable to delete customer');

    }

  });

}

  showMessage(message: string): void {

    this.snackBar.open(message, 'Close', {

      duration: 3000,

      horizontalPosition: 'right',

      verticalPosition: 'top'

    });

  }

}