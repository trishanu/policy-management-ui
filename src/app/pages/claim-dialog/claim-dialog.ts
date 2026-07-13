import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { Claim } from '../../models/claim';
import { Policy } from '../../models/policy';

import { ClaimService } from '../../core/services/claim.service';
import { PolicyApi } from '../../core/services/policy-api';

@Component({
  selector: 'app-claim-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './claim-dialog.html',
  styleUrls: ['./claim-dialog.css']
})
export class ClaimDialog implements OnInit {

  claim: Claim = {} as Claim;

  policies: Policy[] = [];

  mode: 'create' | 'edit' = 'create';

  constructor(

    private claimService: ClaimService,

    private policyService: PolicyApi,

    private dialogRef: MatDialogRef<ClaimDialog>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) { }

  ngOnInit(): void {

    this.loadPolicies();

    if (this.data?.id) {

      this.mode = 'edit';

      this.loadClaim(this.data.id);

    }

  }

  /**
   * Load all policies
   */
  loadPolicies(): void {

    this.policyService.getPolicies().subscribe({

      next: (response:any) => {

        this.policies = response;

      },

      error: (error:any) => {

        console.error(error);

        alert('Unable to load policies');

      }

    });

  }

  /**
   * Load Claim
   */
  loadClaim(id: number): void {

    this.claimService.getClaimById(id).subscribe({

      next: (response:any) => {

        this.claim = response;

      },

      error: (error:any) => {

        console.error(error);

        alert('Unable to load claim');

      }

    });

  }

  /**
   * Save Claim
   */
  saveClaim(): void {

    if (!this.claim.claimNumber ||
        !this.claim.policyId ||
        !this.claim.claimAmount ||
        !this.claim.claimDate) {

      alert('Please fill all mandatory fields');

      return;

    }

    if (this.mode === 'create') {

      this.claimService.submitClaim(this.claim).subscribe({

        next: () => {

          alert('Claim Submitted Successfully');

          this.dialogRef.close(true);

        },

        error: (error:any) => {

          console.error(error);

          alert('Unable to submit claim');

        }

      });

    } else {

      // Future update implementation
      alert('Update Claim API not implemented.');

    }

  }

  /**
   * Close Dialog
   */
  close(): void {

    this.dialogRef.close();

  }

}