import { Component, OnInit } from '@angular/core';

declare var fullpage: any;



@Component({
  selector: 'app-sc-home',
  templateUrl: './sc-home.component.html',
  styleUrls: ['./sc-home.component.scss'],
})
export class ScHomeComponent implements OnInit {
  x: any;
  constructor() {}

  ngOnInit() {
    this.x = new fullpage('#fullpage', {
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      autoScrolling: true,
      scrollBar: true,
      scrollingSpeed: 300,
      navigation: true,
      fadingEffect: true
      // afterLoad: (origin, destination, direction) => {
      //   this.LocalInteractionService.LinkChange.next(destination.index);

      // }
    });
  }
}
