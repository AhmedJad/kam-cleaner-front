import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class ContactClientService {
  private baseUrl = `${DOMAIN}/contact-us`;
  constructor(private _httpClient: HttpClient) { }
  public save(formData: any) {
    return this._httpClient.post(this.baseUrl, formData);
  }
  public showFirst() {
    return this._httpClient.get(`${this.baseUrl}/first`);
  }
}
