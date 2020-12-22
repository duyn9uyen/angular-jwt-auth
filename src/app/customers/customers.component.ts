import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: [``]
})
export class CustomersComponent implements OnInit  {
  customers: any;

  constructor(private http: HttpClient) { }

  // we are sending an HTTP GET request to the endpoint http://localhost:5000/api/customers
  // with the JSON web token in the Authorization header.
  // Yes, you can’t see the authorization header in the request
  // but it will be there due to the auth-jwt library configuration in (app.module.ts)
  ngOnInit() {
    this.http.get("http://localhost:5000/api/customers", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.customers = response;
    }, err => {
      console.log(err)
    });
  }
}
