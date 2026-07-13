import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Claim } from '../../models/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  private apiUrl = 'http://localhost:8082/api/claims';

  constructor(private http: HttpClient) { }

  /**
   * Common Headers
   */
  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

  }

  /**
   * Get All Claims
   */
  getClaims(): Observable<Claim[]> {

    return this.http.get<Claim[]>(
      this.apiUrl,
      {
        headers: this.getHeaders()
      }
    );

  }

  /**
   * Get Claim By Id
   */
  getClaimById(id: number): Observable<Claim> {

    return this.http.get<Claim>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );

  }

  /**
   * Submit Claim
   */
  submitClaim(claim: Claim): Observable<Claim> {

    return this.http.post<Claim>(
      this.apiUrl,
      claim,
      {
        headers: this.getHeaders()
      }
    );

  }

  /**
   * Approve Claim
   */
  approveClaim(id: number): Observable<Claim> {

    return this.http.put<Claim>(
      `${this.apiUrl}/${id}/approve`,
      {},
      {
        headers: this.getHeaders()
      }
    );

  }

  /**
   * Reject Claim
   */
  rejectClaim(id: number): Observable<Claim> {

    return this.http.put<Claim>(
      `${this.apiUrl}/${id}/reject`,
      {},
      {
        headers: this.getHeaders()
      }
    );

  }

}