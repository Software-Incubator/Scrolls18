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
  /*$(document).ready(function(){
    $("button").click(function(){
        var div = $("div");  
        div.animate({left: '100px'}, "slow");
        div.animate({fontSize: '5em'}, "slow");
    });
});*/
  }
}
