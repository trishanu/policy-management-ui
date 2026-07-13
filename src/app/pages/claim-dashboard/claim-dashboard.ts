import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Claim } from '../../models/claim';
import { ClaimService } from '../../core/services/claim.service';
import { ClaimDialog } from '../claim-dialog/claim-dialog';

@Component({
  selector: 'app-claim-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './claim-dashboard.html',
  styleUrls: ['./claim-dashboard.css']
})
export class ClaimDashboard implements OnInit {

  claims: Claim[] = [];

  searchText = '';

  totalClaims = 0;

  pendingClaims = 0;

  approvedClaims = 0;

  rejectedClaims = 0;

  constructor(
    private claimService: ClaimService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadClaims();

  }

  /**
   * Load all claims
   */
  loadClaims(): void {

    this.claimService.getClaims().subscribe({

      next: (response: any) => {

        this.claims = response;

        this.calculateDashboard();

      },

      error: (error: any) => {

        console.error(error);

        alert('Unable to load claims');

      }

    });

  }

  /**
   * Dashboard counts
   */
  calculateDashboard(): void {

    this.totalClaims = this.claims.length;

    this.pendingClaims = this.claims.filter(
      x => x.status === 'PENDING'
    ).length;

    this.approvedClaims = this.claims.filter(
      x => x.status === 'APPROVED'
    ).length;

    this.rejectedClaims = this.claims.filter(
      x => x.status === 'REJECTED'
    ).length;

  }

  /**
   * Search by Id
   */
  searchClaim(): void {

  if (!this.searchText) {

    this.loadClaims();

    return;

  }

  this.claimService.getClaimById(Number(this.searchText)).subscribe({

    next: (claim) => {

      this.claims = [claim];

      this.totalClaims = 1;

      this.pendingClaims =
        claim.status === 'PENDING' ? 1 : 0;

      this.approvedClaims =
        claim.status === 'APPROVED' ? 1 : 0;

      this.rejectedClaims =
        claim.status === 'REJECTED' ? 1 : 0;

    },

    error: (error) => {

      console.error(error);

      this.claims = [];

      this.totalClaims = 0;
      this.pendingClaims = 0;
      this.approvedClaims = 0;
      this.rejectedClaims = 0;

      alert('Claim not found');

    }

  });

}

  /**
   * Open Dialog
   */
  openClaimDialog(): void {

    const dialogRef = this.dialog.open(ClaimDialog, {

      width: '800px',

      maxWidth: '95vw'

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadClaims();

      }

    });

  }

  /**
   * Approve Claim
   */
  approveClaim(id: number): void {

    if (!confirm('Approve this claim?')) {

      return;

    }

    this.claimService.approveClaim(id)
      .subscribe({

        next: () => {

          alert('Claim Approved Successfully');

          this.loadClaims();

        },

        error: (error: any) => {

          console.error(error);

          alert('Unable to approve claim');

        }

      });

  }

  /**
   * Reject Claim
   */
  rejectClaim(id: number): void {

    if (!confirm('Reject this claim?')) {

      return;

    }

    this.claimService.rejectClaim(id)
      .subscribe({

        next: () => {

          alert('Claim Rejected Successfully');

          this.loadClaims();

        },

        error: (error: any) => {

          console.error(error);

          alert('Unable to reject claim');

        }

      });

  }

}