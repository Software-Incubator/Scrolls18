import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  storeToken(token: string) {
    localStorage.setItem('currentUser', token);
  }
  storeAdminToken(token: string) {
    localStorage.setItem('admin', token);
  }
  clearToken() {
    localStorage.removeItem('currentUser');
  }
  clearAdminToken() {
    localStorage.removeItem('admin');
  }
  getToken() {
    return localStorage.getItem('currentUser');
  }
  getAdminToken() {
    return localStorage.getItem('admin');
  }
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
  isAdminLoggedIn() {
    if (localStorage.getItem('admin')) {
      return true;
    }
    return false;
  }
}
