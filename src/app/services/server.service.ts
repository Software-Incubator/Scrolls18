import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private URL = 'http://83668b71.ngrok.io';
  constructor(private http: HttpClient) { }
  signup(signup_details){
    return this.http.post(`${this.URL}/api/signUp`,signup_details);
  }
  login(login_details){
    return this.http.post(`${this.URL}/api/login`,login_details);
  }
}
