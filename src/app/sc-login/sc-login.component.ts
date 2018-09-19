import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sc-login',
  templateUrl: './sc-login.component.html',
  styleUrls: ['./sc-login.component.scss']
})
export class ScLoginComponent implements OnInit {
  model: any = {};
  model2: any = {};
  Loading = false;
  data: any;
  responseError: any;
  responseError2: any;
  constructor(private server: ServerService, private auth: AuthService, private router: Router) {

  }
  ngOnInit() {
  }
  onSubmit() {
    this.Loading = true;
    //console.log(this.model);
    this.server.login(this.model)
    .subscribe(
      res => {
      this.Loading = false;
      this.data = res;
      //console.log(this.data.token);
      this.auth.storeToken(this.data.token);
      this.router.navigate(['/dashboard']);
    },
  err => {
    this.Loading = false;
    this.responseError = err;
    //console.log(err);
  });
  }
  openForgetPass() {
    document.getElementById('closeLogin').click();
  }
  onsubmitForget(f2_form: any) {
    this.Loading = true;
    // console.log(this.model2);
    this.server.forgotPassword(this.model2).subscribe(
      res => {
        this.Loading = false;
        // console.log(res);
        this.responseError2 = res;
        if (this.responseError2.error.status === false) {
          setTimeout(() => {
            document.getElementById('closeForget').click();
            this.responseError2.error.status = "oth";
            f2_form.resetForm();
          }, 5000);

        }
      },
      err => {
        this.Loading = false;
        this.responseError2 = { msg : "Something went wrong" };
      }
    );
  }
}
