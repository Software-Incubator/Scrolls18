import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-sc-dashboard',
  templateUrl: './sc-dashboard.component.html',
  styleUrls: ['./sc-dashboard.component.scss']
})
export class ScDashboardComponent implements OnInit {
  submitted = false;
  track = 0;
  public form: FormGroup;
  private control: FormArray;
  constructor( private fb: FormBuilder) {
  }
  ngOnInit() {
    this.fb = new FormBuilder;
    this.form = this.fb.group({
      domain: ['', Validators.required],
      topic: ['', Validators.required],
      numberOfMembers: ['', Validators.required],
      members: this.fb.array([])
    });
    this.control = <FormArray>this.form.controls['members'];
  }
  get f() {
    return this.form.controls;
  }
  get s() {
    this.submitted = false;
    return this.form['controls'].members['controls'][this.track - 1]['controls'];
  }
  onSubmit() {
    console.log(this.form['controls'].members['controls']['0']['controls'].memberType.value = "a");
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value, this.form);
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
      && this.form['controls'].members['controls'][this.track - 1]['controls'].studentNumber.valid
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
  checkPre() {
    if (this.track === 0) {
      return 0;
    }
    return 1;
  }
  next() {
    this.track++;
    console.log(this.track);
  }
  previous() {
    this.track--;
    console.log(this.track);
  }
  getNumberOfMem(n: number) {
    for (let j = +this.form.value.members.length; j >= 0; j--) {
      this.control.removeAt(j);
    }
    for (let j = 0; j < n; j++) {
      if (j === 0) {
        this.control.push(this.getmembersFormArr("leader"));
      } else {
        this.control.push(this.getmembersFormArr("member"));
      }
    }
  }

  getmembersFormArr(mem: string) {
    return this.fb.group({
      name: ['', Validators.required],
      course: ['', Validators.required],
      year: ['', Validators.required],
      college: ['', Validators.required],
      studentNumber: ['', [Validators.required, /*Validators.pattern('^[1][5-8]\d{5}[Dd]{0,1}$')*/]],
      email: ['', [Validators.required, Validators.email]],
      mobno: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      accomodation: ['', Validators.required],
      memberType: [mem, Validators.required]
    });
  }
}
