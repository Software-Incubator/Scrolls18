import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgsRevealModule } from 'ng-scrollreveal';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';


import { AppComponent } from './app.component';
import { ScHomeComponent } from './sc-home/sc-home.component';
import { ScRegisterComponent } from './sc-register/sc-register.component';
import { ScDashboardComponent } from './sc-dashboard/sc-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { ScNavbarComponent } from './sc-navbar/sc-navbar.component';
import { ScLoginComponent } from './sc-login/sc-login.component';
import { ConfirmEqualValidatorDirective } from './confirm-equal-validator.directive';
import { ServerService } from './services/server.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/authguard.service';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'http://localhost:3000/api/uploadFile',
   maxFilesize: 3,
   headers : {'Authorization': 'Bearer ' +  localStorage.getItem('currentUser')},
   acceptedFiles: 'application/pdf'
 };


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
    ReactiveFormsModule,
    DropzoneModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    NgsRevealModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    HttpClientModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AuthService, ServerService, AuthGuard, {
    provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
