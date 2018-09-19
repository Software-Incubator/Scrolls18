import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServerService } from '../services/server.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sc-forgetpass',
  templateUrl: './sc-forgetpass.component.html',
  styleUrls: ['./sc-forgetpass.component.scss']
})
export class ScForgetpassComponent implements OnInit {

  responseError: any;
  token: string;
  model: any = {};
  Loading = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private server: ServerService, private auth: AuthService) { }

  ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.token = params['token'];
        // console.log('Query param page: ', this.token);
      });
  }
  onSubmit() {
    this.model.token = this.token;
    // console.log(this.model);
    this.Loading = true;
    this.server.resetPassword(this.model)
    .subscribe(
      res => {
      this.Loading = false;
      // console.log(res);
      this.responseError = res;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 5000);
    },
  err => {
    this.Loading = false;
    this.responseError = err;
    //// // console.log(err);
  });
  }
}
