import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { ScHomeComponent } from './sc-home/sc-home.component';
import { ScRegisterComponent } from './sc-register/sc-register.component';
import { ScDashboardComponent } from './sc-dashboard/sc-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { MnFullpageModule } from 'ngx-fullpage';
import { ScNavbarComponent } from './sc-navbar/sc-navbar.component';
import { ScLoginComponent } from './sc-login/sc-login.component';

@NgModule({
  declarations: [
    AppComponent,
    ScHomeComponent,
    ScRegisterComponent,
    ScDashboardComponent,
    ScNavbarComponent,
    ScLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MnFullpageModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
