import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sc-login',
  templateUrl: './sc-login.component.html',
  styleUrls: ['./sc-login.component.scss']
})
export class ScLoginComponent implements OnInit {
  model: any = {};
  Loading: boolean = false;
  data: any;
  constructor(private server: ServerService, private auth: AuthService) { 

  }
  ngOnInit() {
  } 
  onSubmit() {
    this.Loading = true;
    console.log(this.model);
    this.server.login(this.model)
    .subscribe(res => {
      this.Loading = false;
      this.data = res;
      console.log(this.data.token);
      this.auth.storeToken(this.data.token);
    });
  }
}
