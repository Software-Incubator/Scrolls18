import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  storeToken(token: string){
    localStorage.setItem('currentUser', JSON.stringify(token));
  }
}
