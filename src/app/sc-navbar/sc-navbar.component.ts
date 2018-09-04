import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sc-navbar',
  templateUrl: './sc-navbar.component.html',
  styleUrls: ['./sc-navbar.component.scss']
})
export class ScNavbarComponent implements OnInit {
  loginStatus: boolean;
  constructor(private auth: AuthService, private router: Router) {
   }

  ngOnInit() {
    this.loginStatus = this.auth.isLoggedIn();
  }
  logout(){
    this.auth.clearToken();
    this.loginStatus = false;
    this.router.navigate(['/']);
  }
}
