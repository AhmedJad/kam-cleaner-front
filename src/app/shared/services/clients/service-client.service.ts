import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceClientService {

  private baseUrl = `${DOMAIN}/services`;
  constructor(private _httpClient: HttpClient) { }
  store(slider: any) {
    return this._httpClient.post(this.baseUrl, slider);
  }
  update(slider: any) {
    return this._httpClient.post(`${this.baseUrl}/update`, slider);
  }
  delete(id: any) {
    return this._httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getServices() {
    return this._httpClient.get(this.baseUrl);
  }
  getLatestServices(limit: any) {
    return this._httpClient.get(`${this.baseUrl}/latest/${limit}`);
  }
}
