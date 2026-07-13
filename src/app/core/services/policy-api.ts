import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from '..//../models/policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyApi {

  private apiUrl = 'http://localhost:8082/api/policies';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

  }

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }

  getPolicyById(id: number): Observable<Policy> {
    return this.http.get<Policy>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  createPolicy(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(
      this.apiUrl,
      policy,
      { headers: this.getHeaders() }
    );
  }

  updatePolicy(id: number, policy: Policy): Observable<Policy> {
    return this.http.put<Policy>(
      `${this.apiUrl}/${id}`,
      policy,
      { headers: this.getHeaders() }
    );
  }

  deletePolicy(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  renewPolicy(id: number): Observable<Policy> {
    return this.http.put<Policy>(
      `${this.apiUrl}/${id}/renew`,
      {},
      { headers: this.getHeaders() }
    );
  }

  cancelPolicy(id: number): Observable<Policy> {
    return this.http.put<Policy>(
      `${this.apiUrl}/${id}/cancel`,
      {},
      { headers: this.getHeaders() }
    );
  }

}