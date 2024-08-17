import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [    ReactiveFormsModule,CommonModule,HttpClientModule
  ],
  providers: [ProductsService],

  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent  implements OnInit {
  products: any[] = [];
  totalProducts: number = 0;
  currentPage: number = 1;
  limit: number = 10; // Products per page
  searchQuery: string = '';
  selectedCategory: string = '';
  constructor(private http: HttpClient,private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }
 
  
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.fetchProducts();
  }
  
  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    this.fetchProducts();
  }
  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
  fetchProducts(): void {
    const skip = (this.currentPage - 1) * this.limit;
    let url = `https://dummyjson.com/products?limit=${this.limit}&skip=${skip}`;
  
    if (this.searchQuery) {
      url += `&search=${this.searchQuery}`;
    }
  
    if (this.selectedCategory) {
      url += `&category=${this.selectedCategory}`;
    }
  
    // this.http.get<any>(url)
    this.productsService.getProducts(this.limit,skip)
      .subscribe((response: { products: any[]; total: number; }) => {
        this.products = response.products;
        this.totalProducts = response.total;
      });
  }
  // fetchProducts(): void {
  //   const skip = (this.currentPage - 1) * this.limit;
  //   this.http.get<any>(`https://dummyjson.com/products?limit=${this.limit}&skip=${skip}`)
  //     .subscribe(response => {
  //       this.products = response.products;
  //       this.totalProducts = response.total;
  //     });
  // }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.limit);
  }
}