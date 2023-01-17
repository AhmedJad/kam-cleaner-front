import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from '../global';

@Injectable({
  providedIn: 'root'
})
export class PaymentClientService {
  private baseUrl = `${DOMAIN}/payment`;
  constructor(private _httpClient: HttpClient) { }
  cashPayment() {
    return this._httpClient.get(`${this.baseUrl}/cash`);
  }
  onlinePayment() {
    return this._httpClient.get(`${this.baseUrl}/online`);
  }
}