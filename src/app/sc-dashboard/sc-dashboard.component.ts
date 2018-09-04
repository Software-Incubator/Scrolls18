import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sc-dashboard',
  templateUrl: './sc-dashboard.component.html',
  styleUrls: ['./sc-dashboard.component.scss']
})
export class ScDashboardComponent implements OnInit {

  constructor(private server: ServerService, private auth: AuthService) { }

  ngOnInit() {
    this.server.getDashboardDetails(this.auth.getToken())
    .subscribe((data) => {
      console.log(data);
    })
  }

}
