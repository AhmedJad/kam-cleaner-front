import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class CartClientService {
  private baseUrl = `${DOMAIN}/cart`;
  constructor(private _httpClient: HttpClient) { }
  addToCart(cart: any) {
    return this._httpClient.post(this.baseUrl, cart);
  }
  delete(productId) {
    return this._httpClient.delete(`${this.baseUrl}/${productId}`);
  }
  getCartItems() {
    return this._httpClient.get(this.baseUrl);
  }
}
