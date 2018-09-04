import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sc-login',
  templateUrl: './sc-login.component.html',
  styleUrls: ['./sc-login.component.scss']
})
export class ScLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  model: any = {};
 
  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }
}
