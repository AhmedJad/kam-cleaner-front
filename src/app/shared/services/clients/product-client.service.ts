import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class ProductClientService {
  private baseUrl = `${DOMAIN}/products`;
  constructor(private _httpClient: HttpClient) { }
  store(employee: any) {
    return this._httpClient.post(`${this.baseUrl}`, employee);
  }
  update(employee: any) {
    return this._httpClient.post(`${this.baseUrl}/update`, employee);
  }
  delete(id: any) {
    return this._httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getPage(pageNo: any, pageSize: any, text: any = '') {
    return this._httpClient.get(`${this.baseUrl}?page=${pageNo}&page_size=${pageSize}&text=${text}`);
  }
  getAllProducts() {
    return this._httpClient.get(`${this.baseUrl}/all`);
  }
  show(id) {
    return this._httpClient.get(`${this.baseUrl}/${id}`);
  }
}
