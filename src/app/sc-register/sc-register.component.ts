import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-sc-register',
  templateUrl: './sc-register.component.html',
  styleUrls: ['./sc-register.component.scss'],
})
export class ScRegisterComponent implements OnInit {

  model: any = {};
  Loading: boolean = false;
  constructor(private server: ServerService) { }
  ngOnInit() {
  }
  onSubmit() {
    this.Loading = true;
    console.log(this.model);
    this.server.signup(this.model)
    .subscribe(res => {
      this.Loading = false;
      console.log(res);
    });
  }
}
