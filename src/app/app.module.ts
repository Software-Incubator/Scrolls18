import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ScHomeComponent } from './sc-home/sc-home.component';
import { ScRegisterComponent } from './sc-register/sc-register.component';
import { ScDashboardComponent } from './sc-dashboard/sc-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { ScNavbarComponent } from './sc-navbar/sc-navbar.component';
import { ScLoginComponent } from './sc-login/sc-login.component';
import { ConfirmEqualValidatorDirective } from './confirm-equal-validator.directive';
import { AuthService } from './services/auth.service';
import { ServerService } from './services/server.service';

@NgModule({
  declarations: [
    AppComponent,
    ScHomeComponent,
    ScRegisterComponent,
    ScDashboardComponent,
    ScNavbarComponent,
    ScLoginComponent,
    ConfirmEqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AuthService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
