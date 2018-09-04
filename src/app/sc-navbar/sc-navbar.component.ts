import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sc-navbar',
  templateUrl: './sc-navbar.component.html',
  styleUrls: ['./sc-navbar.component.scss']
})
export class ScNavbarComponent implements OnInit {
  loginStatus: boolean;
  homeStatus: boolean;
  constructor(private auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    this.loginStatus = this.auth.isLoggedIn();
    if (this.activatedRoute.snapshot.url.length !== 0) {
      if (this.activatedRoute.snapshot.url[0].path === 'dashboard') {
        this.homeStatus = false;
      }
    } else {
      this.homeStatus = true;
    }
  }
  logout() {
    this.auth.clearToken();
    this.loginStatus = false;
    this.router.navigate(['/']);
  }
}
