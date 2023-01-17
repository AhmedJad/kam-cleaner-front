import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class OrderClientService {
  private baseUrl = `${DOMAIN}/orders`;
  constructor(private _httpClient: HttpClient) { }
  getPage(pageNo: any, pageSize: any, text: any = '', orderStatus, paymentStatus, paymentMethod) {
    return this._httpClient.get(`${this.baseUrl}?page=${pageNo}&page_size=${pageSize}&text=${text}&
    order_status=${orderStatus}&payment_status=${paymentStatus}&payment_method=${paymentMethod}`);
  }
  geUserOrdersPage(pageNo: any, pageSize: any, text: any = '', orderStatus, paymentStatus, paymentMethod) {
    return this._httpClient.get(`${this.baseUrl}/user?page=${pageNo}&page_size=${pageSize}&text=${text}&
    order_status=${orderStatus}&payment_status=${paymentStatus}&payment_method=${paymentMethod}`);
  }
  updateOrderStatus(order) {
    return this._httpClient.put(this.baseUrl, order);
  }
}
