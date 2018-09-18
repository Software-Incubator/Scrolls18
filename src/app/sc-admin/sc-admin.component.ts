import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sc-admin',
  templateUrl: './sc-admin.component.html',
  styleUrls: ['./sc-admin.component.scss']
})
export class ScAdminComponent implements OnInit {
  model: any = {};
  Loading = false;
  data: any;
  responseError: any;
  isAdminLoggedIn: boolean;
  constructor(private server: ServerService, private auth: AuthService) { }

  ngOnInit() {
    this.isAdminLoggedIn = this.auth.isAdminLoggedIn();
  }
  onLogOut() {
    this.auth.clearAdminToken();
    this.isAdminLoggedIn = this.auth.isAdminLoggedIn();
    // console.log(this.isAdminLoggedIn);
  }
  onSubmit() {
    this.Loading = true;
    // console.log(this.model);
    this.server.loginAdmin(this.model)
    .subscribe(
      res => {
      this.Loading = false;
      this.data = res;
      if ( this.data.token ) {
      this.auth.storeAdminToken(this.data.token);
      this.isAdminLoggedIn = this.auth.isAdminLoggedIn();
      }
    },
  err => {
    this.Loading = false;
    this.responseError = err;
    //// console.log(err);
  });
  }

}
