import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class PartnerLogoClientService {
  private baseUrl = `${DOMAIN}/partner-logos`;
  constructor(private _httpClient: HttpClient) { }
  store(partnerLogo: any) {
    return this._httpClient.post(`${this.baseUrl}`, partnerLogo);
  }
  update(partnerLogo: any) {
    return this._httpClient.post(`${this.baseUrl}/update`, partnerLogo);
  }
  delete(id: any) {
    return this._httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getPage(pageNo: any, pageSize: any, text: any = '') {
    return this._httpClient.get(`${this.baseUrl}?page=${pageNo}&page_size=${pageSize}&text=${text}`);
  }
  getLogos() {
    return this._httpClient.get(`${this.baseUrl}/all`);
  }
}
