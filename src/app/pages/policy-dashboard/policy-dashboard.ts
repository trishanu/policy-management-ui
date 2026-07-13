import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Policy } from '../../models/policy';
import { PolicyApi } from '../../core/services/policy-api';
import { PolicyDialog } from '../policy-dialog/policy-dialog';
import { CustomerService } from '../../core/services/CustomerApiService';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-policy-dashboard',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,

    MatFormFieldModule,
    MatInputModule
  ],

  templateUrl: './policy-dashboard.html',
  styleUrl: './policy-dashboard.css'
})
export class PolicyDashboard
  implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'policyNumber',
    'customer',
    'policyType',
    'premiumAmount',
    'startDate',
    'endDate',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Policy>();

  policies: Policy[] = [];

  searchText = '';

  totalPolicies = 0;
  activePolicies = 0;
  renewedPolicies = 0;
  cancelledPolicies = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private policyService: PolicyApi,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {

    this.loadPolicies();

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  loadPolicies(): void {

    this.policyService.getPolicies().subscribe({

      next: (response) => {

        this.policies = response;

        this.dataSource.data = response;

        this.totalPolicies = response.length;

        this.activePolicies =
          response.filter(x => x.status === 'ACTIVE').length;

        this.renewedPolicies =
          response.filter(x => x.status === 'RENEWED').length;

        this.cancelledPolicies =
          response.filter(x => x.status === 'CANCELLED').length;

      },

      error: () => {

        this.showMessage('Unable to load policies');

      }

    });

  }

  searchPolicy(): void {

    if (!this.searchText) {

      this.loadPolicies();

      return;

    }

    this.policyService.getPolicyById(Number(this.searchText)).subscribe({

      next: (policy) => {

        this.policies = [policy];

        this.dataSource.data = [policy];

        // Update dashboard counts if needed
        this.totalPolicies = 1;

        this.activePolicies = policy.status === 'ACTIVE' ? 1 : 0;

        //this.expiredPolicies = policy.status === 'EXPIRED' ? 1 : 0;

        this.cancelledPolicies = policy.status === 'CANCELLED' ? 1 : 0;

      },

      error: (error) => {

        console.error(error);

        this.policies = [];

        this.dataSource.data = [];

        this.showMessage('Policy not found');

      }

    });

  }

  openPolicyDialog(): void {

    const dialogRef = this.dialog.open(PolicyDialog, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      autoFocus: false,
      disableClose: true,

      data: {

        mode: 'create'

      }

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadPolicies();

      }

    });

  }

  viewPolicy(policy: Policy): void {

    this.dialog.open(PolicyDialog, {

      width: '800px',

      data: {

        mode: 'view',

        id: policy.id

      }

    });

  }

  editPolicy(policy: Policy): void {

    const dialogRef = this.dialog.open(PolicyDialog, {

      width: '800px',

      data: {

        mode: 'edit',

        id: policy.id

      }

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadPolicies();

      }

    });

  }

  renewPolicy(id: number): void {

    if (!confirm('Renew this policy?')) {

      return;

    }

    this.policyService.renewPolicy(id).subscribe({

      next: () => {

        this.showMessage('Policy renewed successfully');

        this.loadPolicies();

      },

      error: () => {

        this.showMessage('Unable to renew policy');

      }

    });

  }

  cancelPolicy(id: number): void {

    if (!confirm('Cancel this policy?')) {

      return;

    }

    this.policyService.cancelPolicy(id).subscribe({

      next: () => {

        this.showMessage('Policy cancelled successfully');

        this.loadPolicies();

      },

      error: () => {

        this.showMessage('Unable to cancel policy');

      }

    });

  }

  deletePolicy(id: number): void {

    if (!confirm('Delete this policy?')) {

      return;

    }

    this.policyService.deletePolicy(id).subscribe({

      next: () => {

        this.showMessage('Policy deleted successfully');

        this.loadPolicies();

      },

      error: () => {

        this.showMessage('Unable to delete policy');

      }

    });

  }

  showMessage(message: string): void {

    this.snackBar.open(message, 'Close', {

      duration: 3000

    });

  }

}