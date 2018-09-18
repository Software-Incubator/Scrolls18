import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sc-dashboard',
  templateUrl: './sc-dashboard.component.html',
  styleUrls: ['./sc-dashboard.component.scss']
})
export class ScDashboardComponent implements OnInit {
  emailPattern = '';
  Loading = false;
  submitted = false;
  gotErrorInFileUpload: boolean;
  gotErrorInForm: boolean;
  track = 0;
  nof = [];
  fillStatus: number;
  initialRes: any;
  teamDetailsRes: any;
  responseFileMsg: any;
  public form: FormGroup;

  private control: FormArray;

  constructor( private fb: FormBuilder, private server: ServerService, private auth: AuthService) {
  }

  ngOnInit() {
    this.Loading = true;
    this.fb = new FormBuilder;
    this.server.getDashboardDetails(this.auth.getToken()).subscribe(
      res => {
        this.Loading = false;
        this.initialRes = res;
         // console.log(this.initialRes);
        // console.log(this.initialRes.filledStatus);
        // console.log(typeof(this.initialRes.filledStatus));
        if ( this.initialRes.filledStatus === '0') {
          this.emailPattern = this.initialRes.details.email;
          this.form = this.fb.group({
            domain: ['', Validators.required],
            topic: ['', Validators.required],
            numberOfMembers: ['', Validators.required],
            members: this.fb.array([])
          });
          this.control = <FormArray>this.form.controls['members'];
          } else if ( this.initialRes.filledStatus === '1') {
            for (let k = 0; k < this.initialRes.details.details.memberDetails.length; k++ ) {
              this.nof.push(k);
            }
            this.track = this.initialRes.details.details.memberDetails.length + 1;
          } else if (this.initialRes.filledStatus === '2') {
            this.nof = [];
            for (let k = 0; k < this.initialRes.details.details.memberDetails.length; k++ ) {
              this.nof.push(k);
            }
          }
      },
      err => {
        this.Loading = false  ;
        // console.log(err);
      }
    );
  }
  get f() {
    return this.form.controls;
  }
  get s() {
    if (this.form['controls'].members['controls'][this.track - 1]['controls'].college.value === 'akg') {
      this.form['controls'].members['controls'][this.track - 1]['controls'].studentNo.setValidators([Validators.required, Validators.pattern("^[1][5-8][0-3][0-4][0-9]{3}[Dd]{0,1}$")]);
    } else {
      this.form['controls'].members['controls'][this.track - 1]['controls'].studentNo.setValidators([Validators.required]);
    }
    this.submitted = false;
    return this.form['controls'].members['controls'][this.track - 1]['controls'];

  }
  onSubmit() {
    this.Loading = true;
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.server.postregisterDetails(this.auth.getToken(), this.form.value)
    .subscribe(
      res => {
        this.Loading = false;
        // console.log(res);
        this.teamDetailsRes = res;
        this.initialRes.filledStatus = '1';
        this.track++;
        this.gotErrorInFileUpload = false;
    document.getElementById('openModalButton').click();
    this.responseFileMsg = this.teamDetailsRes;
      },
      err => {
        this.gotErrorInFileUpload = true;
        document.getElementById('openModalButton').click();
        this.Loading = false;
        // console.log(err);
      }
    );
    //// console.log(this.form.value, this.form);
  }
  checkFormValid() {
    if (this.form.invalid) {
      return true;
    }
  }
  checkNext() {
    if (this.track === 0) {
      if ((this.form.value.domain !== '')
      && (this.form.value.topic !== '') && (this.form.value.numberOfMembers !== '')) {
        return 1;
      }
      return 0;
    } else if (this.track === 2 && +this.form.value.numberOfMembers === 2) {
      return 0;
    } else if (this.track === 1 || this.track === 2) {
      if (this.form['controls'].members['controls'][this.track - 1]['controls'].name.valid
      && this.form['controls'].members['controls'][this.track - 1]['controls'].course.valid
      && this.form['controls'].members['controls'][this.track - 1]['controls'].email.valid
      && this.form['controls'].members['controls'][this.track - 1]['controls'].college.valid
      && this.form['controls'].members['controls'][this.track - 1]['controls'].studentNo.valid
      && this.form['controls'].members['controls'][this.track - 1]['controls'].mobno.valid
      && this.form['controls'].members['controls'][this.track - 1]['controls'].accomodation.valid
      && this.form['controls'].members['controls'][this.track - 1]['controls'].year.valid) {
        return 1;
      }
      return 0;
    } else {
      return 0;
    }

  }
  resetValue() {
    this.form['controls'].members['controls'][this.track - 1]['controls'].year.reset();
  }
  resetValue2() {
    this.form['controls'].members['controls'][this.track - 1]['controls'].studentNo.reset();
    this.form['controls'].members['controls'][this.track - 1]['controls'].studentNo.clearValidators();
  }
  checkPre() {
    if (this.track === 0) {
      return 0;
    }
    return 1;
  }
  next() {
    this.track++;
    //// console.log(this.track);
  }
  previous() {
    this.track--;
    //// console.log(this.track);
  }
  getNumberOfMem(n: number) {
    for (let j = +this.form.value.members.length; j >= 0; j--) {
      this.control.removeAt(j);
    }
    this.nof = [];
    for (let k = 0; k < n; k++ ) {
      this.nof.push(k);
    }
    for (let j = 0; j < n; j++) {
      if (j === 0) {
        this.control.push(this.getmembersFormArr('leader'));
      } else {
        this.control.push(this.getmembersFormArr('member'));
      }
    }
  }

  getmembersFormArr(mem: string) {
    return this.fb.group({
      name: ['', Validators.required],
      course: ['', Validators.required],
      year: ['', Validators.required],
      college: ['', Validators.required],
      studentNo: [''],
      email: ['', [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]],
      mobno: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      accomodation: ['', Validators.required],
      memberType: [mem, Validators.required],
      id: ['']
    });
  }

  /*- checks if word exists in array -*/
  isInArray(array, word) {
    return array.indexOf(word.toLowerCase()) > -1;
  }
  onUploadError(e) {
    // console.log(e);
  }
  onUploadSuccess(e2) {
    this.responseFileMsg = e2[1];
    this.gotErrorInFileUpload = false;
    document.getElementById('openModalButton').click();
     this.server.getDashboardDetails(this.auth.getToken()).subscribe(
       res => {
         this.initialRes = res;
        this.nof = [];
        for (let k = 0; k < this.initialRes.details.details.memberDetails.length; k++ ) {
          this.nof.push(k);
        }
          //console.log(res);
       },
       err => {
        // console.log(err);
       }
    );
     //console.log(this.initialRes);
     //console.log(e2);
  }
}
