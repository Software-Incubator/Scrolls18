import { Component, OnInit } from '@angular/core';

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-sc-register',
  templateUrl: './sc-register.component.html',
  styleUrls: ['./sc-register.component.scss']
})
export class ScRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public formModel: FormModel = {};
}
