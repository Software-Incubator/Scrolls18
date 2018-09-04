import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-sc-login',
  templateUrl: './sc-login.component.html',
  styleUrls: ['./sc-login.component.scss']
})
export class ScLoginComponent implements OnInit {
  model: any = {};
  Loading: boolean = false;
  constructor(private server: ServerService) { 

  }
  ngOnInit() {
  } 
  onSubmit() {
    this.Loading = true;
    console.log(this.model);
    this.server.login(this.model)
    .subscribe(res => {
      this.Loading = false;
      console.log(res);
    });
  }
}
