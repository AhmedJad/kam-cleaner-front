import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${DOMAIN}/clients`;
  constructor(private _httpClient: HttpClient) { }
  store(client: any) {
    return this._httpClient.post(this.baseUrl, client);
  }
  update(client: any) {
    return this._httpClient.post(`${this.baseUrl}/update`, client);
  }
  delete(id: any) {
    return this._httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getClients() {
    return this._httpClient.get(this.baseUrl);
  }
  getLatestClients(limit: any) {
    return this._httpClient.get(`${this.baseUrl}/latest/${limit}`);
  }
}
