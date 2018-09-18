import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sc-admin-dashboard',
  templateUrl: './sc-admin-dashboard.component.html',
  styleUrls: ['./sc-admin-dashboard.component.scss']
})
export class ScAdminDashboardComponent implements OnInit {
  status: boolean;
  nof: any[];
  Loading = false;
  data: any;
  not = [];
  responseError: any;
  isAdminLoggedIn: boolean;
  detailsRes: any;
  constructor(private server: ServerService, private auth: AuthService) { }

  ngOnInit() {
    this.server.getAllTeams(this.auth.getAdminToken()).subscribe(
      res => {
        this.data = res;
        for (let k = 0; k < this.data.teams.length; k++ ) {
          this.not.push(k);
        }
      },
      err => {
        // console.log(err);
      }
    );
    this.isAdminLoggedIn = this.auth.isAdminLoggedIn();
  }
  viewDetails(id: string) {
    this.server.getTeamDetails(this.auth.getAdminToken(), id).subscribe(
      res => {
        this.detailsRes = res;
        // console.log(res);
        // console.log(typeof(this.detailsRes.details));
        if (this.detailsRes.details === 0) {
          // console.log('hi');
          this.status = false;
        } else {
          this.nof = [];
          for (let k = 0; k < this.detailsRes.details.teamDetails[0].numberOfMembers; k++ ) {
            this.nof.push(k);
          }
          this.status = true;
        }
        document.getElementById('openModalButton').click();
      },
      err => {
        // console.log(err);
      }
    );
  }
}
