import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  auth_token = '';

  constructor(private http: HttpClient) { }

  userLogin(user: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth_token}`);
    let resp = this.http.request('POST', 'http://localhost:3000/api/login', { responseType: 'json', headers: headers, body: user })
    return resp
  }

  userSignup(user: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth_token}`);
    return this.http.request('POST', 'http://localhost:3000/api/signup', { responseType: 'json', headers: headers, body: user });
  }

  userToken(token: string) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth_token}`);
    return this.http.request('POST', 'http://localhost:3000/api/token', { responseType: 'json', headers: headers, body: localStorage.getItem('refreshToken') });
  }

  userLogout() {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth_token}`);
    return this.http.request('DELETE', 'http://localhost:3000/api/logout', { responseType: 'json', headers: headers, body: localStorage.getItem('refreshToken') });
  }
}
