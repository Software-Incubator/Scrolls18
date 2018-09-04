import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private URL = 'http://10.10.152.19:8000/';
  constructor(private http: HttpClient) { }
  signup(signup_details){
    return this.http.post(this.URL,signup_details);
  }
}
