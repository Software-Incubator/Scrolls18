import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  storeToken(token: string) {
    localStorage.setItem('currentUser', token);
  }
  clearToken() {
    localStorage.removeItem('currentUser');
  }
  getToken() {
    return localStorage.getItem('currentUser');
  }
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
}
