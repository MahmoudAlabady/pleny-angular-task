import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import the HttpClientModule from @angular/common/http,

import { HttpClientModule } from '@angular/common/http';

// add it to the @NgModule.imports array.

// imports:[HttpClientModule,  ]
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [    ReactiveFormsModule,CommonModule,HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post('https://dummyjson.com/auth/login', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            // Save the authentication token
            localStorage.setItem('authToken', response.token);
            // Redirect to the products page
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.error('Login failed', error);
            // Handle error (e.g., show a message to the user)
          }
        });
    }
  }
}
