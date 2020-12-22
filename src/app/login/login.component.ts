import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(private router: Router, private http: HttpClient) { }

  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);

    // Make sure the API is running on the same port!
    this.http.post("http://localhost:5000/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;

      // You can use the browser's session storage instead of local storage if you want.
      localStorage.setItem("jwt", token);

      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }
}
