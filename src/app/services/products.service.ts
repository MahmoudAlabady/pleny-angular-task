import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(   private http: HttpClient,
    private router: Router,) { }
  getProducts(limit: number, skip: number):any {
    return this.http.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)

  }
}
