import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';

import { ServerService } from '../services/server.service';


@Component({
  selector: 'app-sc-register',
  templateUrl: './sc-register.component.html',
  styleUrls: ['./sc-register.component.scss'],
})
export class ScRegisterComponent implements OnInit {
  model: any = {};
  Loading = false;
  responseMessage: any;
  gotError: boolean;
  constructor(private server: ServerService) { }
  ngOnInit() {
  }
  onSubmit() {
    this.Loading = true;
    //console.log(this.model);
    this.server.signup(this.model)
    .subscribe(
      res => {
      this.Loading = false;
      this.responseMessage = res;
      this.gotError = false;
      //console.log(res);
      document.getElementById('openModalButton').click();
      //console.log(this.responseMessage);
    },
    err => {
      this.Loading = false;
      this.gotError = true;
      //console.log(err);
      if(err.status === 409){
        this.responseMessage = 'This team has been already registered';
      }
      else if(err.status === 500) {
        this.responseMessage = 'Something went wrong';
      }
      document.getElementById('openModalButton').click();
      //console.log(this.responseMessage);
      //console.log(this.responseMessage.error.msg);
    }
  );
  }
}
