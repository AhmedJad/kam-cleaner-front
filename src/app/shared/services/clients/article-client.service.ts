import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class ArticleClientService {
  private baseUrl = `${DOMAIN}/articles`;
  constructor(private _httpClient: HttpClient) { }
  store(article: any) {
    return this._httpClient.post(`${this.baseUrl}`, article);
  }
  update(article: any) {
    return this._httpClient.post(`${this.baseUrl}/update`, article);
  }
  delete(id: any) {
    return this._httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getPage(pageNo: any, pageSize: any, text: any = '') {
    return this._httpClient.get(`${this.baseUrl}?page=${pageNo}&page_size=${pageSize}&text=${text}`);
  }
  show(id) {
    return this._httpClient.get(`${this.baseUrl}/${id}`);
  }
  getLatestArticles(limit: any) {
    return this._httpClient.get(`${this.baseUrl}/latest/${limit}`);
  }
}
