import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sc-register',
  templateUrl: './sc-register.component.html',
  styleUrls: ['./sc-register.component.scss'],
})
export class ScRegisterComponent implements OnInit {

  model: any = {};
  constructor() { }
  ngOnInit() {
  }
  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }
}
