import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sc-home',
  templateUrl: './sc-home.component.html',
  styleUrls: ['./sc-home.component.scss']
})
export class ScHomeComponent implements OnInit {
  title = 'Look jQuery Animation working in action!';
  constructor() { }

  ngOnInit() {
  }
}
