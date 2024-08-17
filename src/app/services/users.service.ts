import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
  
})
export class UsersService {

  constructor(private http: HttpClient,
    private router: Router,) { }
  auth(user: any) {
    return this.http.post('https://dummyjson.com/auth/login', user)

  }


}
