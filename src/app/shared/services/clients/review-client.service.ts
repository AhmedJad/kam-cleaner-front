import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class ReviewClientService {

  private baseUrl = `${DOMAIN}/reviews`;
  constructor(private _httpClient: HttpClient) { }
  store(review: any) {
    return this._httpClient.post(`${this.baseUrl}`, review);
  }
  update(review: any) {
    return this._httpClient.post(`${this.baseUrl}/update`, review);
  }
  delete(id: any) {
    return this._httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getPage(pageNo: any, pageSize: any, text: any = '') {
    return this._httpClient.get(`${this.baseUrl}?page=${pageNo}&page_size=${pageSize}&text=${text}`);
  }
  getAllReviews() {
    return this._httpClient.get(`${this.baseUrl}/all`);
  }
}
