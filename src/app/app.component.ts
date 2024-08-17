import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'pleny-angular-task';
  cartItemCount$ = this.cartService.getCartItemCount();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
}
