import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class GalleryClientService {
  private baseUrl = `${DOMAIN}/galleries`;
  constructor(private _httpClient: HttpClient) { }
  store(gallery: any) {
    return this._httpClient.post(`${this.baseUrl}`, gallery);
  }
  update(gallery: any) {
    return this._httpClient.post(`${this.baseUrl}/update`, gallery);
  }
  delete(id: any) {
    return this._httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getPage(pageNo: any, pageSize: any, text: any = '') {
    return this._httpClient.get(`${this.baseUrl}?page=${pageNo}&page_size=${pageSize}&text=${text}`);
  }
}
