import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

//declare var fullpage: any;



@Component({
  selector: 'app-sc-home',
  templateUrl: './sc-home.component.html',
  styleUrls: ['./sc-home.component.scss'],
})
export class ScHomeComponent implements OnInit {
  x: any;
  response: any;
  items: number[] = [];
  constructor(private server: ServerService) {}

  ngOnInit() {
    // this.x = new fullpage('#fullpage', {
    //   licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    //   autoScrolling: false,
    //   scrollBar: true,
    //   scrollingSpeed: 300,
    //   fadingEffect: true,
    //   responsiveWidth: 500,
    //   paddingTop: '3em',
      // afterLoad: (origin, destination, direction) => {
      //   this.LocalInteractionService.LinkChange.next(destination.index);

      // }
    // });
    this.server.getDateDetails()
    .subscribe(
      res => {
        //console.log(res);
        this.response = res;
        this.createRange();
      }
    );
  }
  createRange() {
    //console.log(this.response.impDates.length);
    for ( let i = 0; i < this.response.impDates.length; i++) {
       this.items.push(i);
    }
    //console.log(this.items);
    return this.items;
  }
}
