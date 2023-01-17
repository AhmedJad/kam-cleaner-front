import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class SliderClientService {
  private baseUrl = `${DOMAIN}/slider`;
  constructor(private _httpClient: HttpClient) { }
  store(slider: any) {
    return this._httpClient.post(`${this.baseUrl}`, slider);
  }
  update(slider: any) {
    return this._httpClient.post(`${this.baseUrl}/update`, slider);
  }
  delete(id: any) {
    return this._httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getPage(pageNo: any, pageSize: any, text: any = '') {
    return this._httpClient.get(`${this.baseUrl}?page=${pageNo}&page_size=${pageSize}&text=${text}`);
  }
  getAllSliders() {
    return this._httpClient.get(`${this.baseUrl}/all`);
  }
}
