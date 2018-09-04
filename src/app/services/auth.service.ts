import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  storeToken(token: string){
    localStorage.setItem('currentUser', JSON.stringify(token));
  }
  clearToken(){
    localStorage.removeItem('currentUser');
  }
  isLoggedIn(){
    if(localStorage.getItem('currentUser')){
      return true;
    }
    return false;
  }
}
