import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService  {
   private apiUrl="http://localhost:8082/api/customers";

  constructor(private http:HttpClient){}

    getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

getCustomerById(id: number) {

 const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<Customer>(
    `${this.apiUrl}/${id}`,
    { headers }
  );
}


  createCustomer(customer:Customer){
      return this.http.post<Customer>(this.apiUrl,customer);
  }

  updateCustomer(customer:Customer, id:String){
      return this.http.put<Customer>(
          `${this.apiUrl}/${id}`,
          customer
      );
  }
}
