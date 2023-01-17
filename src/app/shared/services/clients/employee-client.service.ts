import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class EmployeeClientService {
  private baseUrl = `${DOMAIN}/employees`;
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
  getLatestEmployees(limit: any) {
    return this._httpClient.get(`${this.baseUrl}/latest/${limit}`);
  }
}
