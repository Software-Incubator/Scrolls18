import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private URL = 'http://www.akgec-scrolls.com';
  constructor(private http: HttpClient) { }

  signup(signup_details) {
    return this.http.post(`${this.URL}/api/signUp`, signup_details);
  }
  login(login_details) {
    return this.http.post(`${this.URL}/api/login`, login_details);
  }
  loginAdmin(login_admin_details) {
    return this.http.post(`${this.URL}/api/adminLogin`, login_admin_details);
  }
  postregisterDetails(token: string, register_details) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' +  token
     });
     return this.http.post(`${this.URL}/api/dashboard`, register_details, {headers: headers});
  }
  getDashboardDetails(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' +  token
     });
    return this.http.get(`${this.URL}/api/dashboard/getAllDetails`, {headers: headers});
  }
  sendFile(token: string, file: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'response': 'application/json',
      'Authorization': 'Bearer ' +  token
     });
     return this.http.post(`${this.URL}/api/upload`, file, {headers: headers});
   }
   getPhase() {
     return this.http.get(`${this.URL}/api/admin/getCurrentPhase`);
   }
   getDateDetails() {
     return this.http.get(`${this.URL}/api/admin/getImportantdates`);
   }
   getAllTeams(token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'response': 'application/json',
      'Authorization': 'Bearer ' +  token
     });
     return this.http.get(`${this.URL}/api/admin/getAllTeams`, {headers: headers});
   }
   getTeamDetails(token, id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'response': 'application/json',
      'Authorization': 'Bearer ' +  token
     });
     return this.http.get(`${this.URL}/api/admin/getTeamDetails?id=${id}`, {headers: headers});
   }
}
