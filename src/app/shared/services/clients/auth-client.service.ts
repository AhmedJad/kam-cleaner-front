import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
  private baseUrl = `${DOMAIN}/auth`;
  constructor(private _httpClient: HttpClient) { }
  verifyToken() {
    return this._httpClient.get(`${this.baseUrl}/verify-token`);
  }
  verifyAdmin() {
    return this._httpClient.get(`${this.baseUrl}/verify-admin`);
  }
  login($cradentials: any) {
    return this._httpClient.post(`${this.baseUrl}/login`, $cradentials) as Observable<any>;
  }
  register(formValue: any) {
    return this._httpClient.post(`${this.baseUrl}/register`, formValue) as Observable<any>;
  }
  logout() {
    return this._httpClient.get(`${this.baseUrl}/logout`);
  }
  forgetPassword(email) {
    return this._httpClient.get(`${this.baseUrl}/forget-password/${email}`);
  }
  resetPassword(formValue) {
    return this._httpClient.post(`${this.baseUrl}/reset-password`, formValue);
  }
  verifyEmail(formValue) {
    return this._httpClient.post(`${this.baseUrl}/verify-email`, formValue);
  }
  resendVerificationCode() {
    return this._httpClient.get(`${this.baseUrl}/resend-verification-code`);
  }
  userVerified() {
    return this._httpClient.get(`${this.baseUrl}/user-verified`);
  }
}
