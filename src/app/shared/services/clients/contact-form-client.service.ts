import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ContactFormClientService {
  private baseUrl = `${DOMAIN}/contact-form`;
  constructor(private _httpClient: HttpClient) { }
  store(contactForm: any) {
    return this._httpClient.post(`${this.baseUrl}`, contactForm);
  }
  getPage(pageNo: any, pageSize: any, text: any = '') {
    return this._httpClient.get(`${this.baseUrl}?page=${pageNo}&page_size=${pageSize}&text=${text}`);
  }
}
