import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCart();
  }

  addToCart(product: any): void {
    this.cartItems.push(product);
    this.cartItemCount.next(this.cartItems.length);
    this.saveCart();
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartItemCount.next(this.cartItems.length);
    }
  }
}
