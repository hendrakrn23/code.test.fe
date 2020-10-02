import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const url = 'http://localhost:8888/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  date: any = ['01','02','03','04','05','06','07','08','09'];
  year: any = [];
  isEmailRegistered: boolean = false;
  isMobileNumberRegistered: boolean = false;
  showLoginButton: boolean = false;
  isRegisterButtonDisabled : boolean = false;

  registrationForm = new FormGroup({
    mobilePhone: new FormControl('',
      [Validators.required,
        Validators.pattern(new RegExp("(62)[0-9 ]"))]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    gender: new FormControl('-'),
    date: new FormControl('Date'),
    month: new FormControl('Month'),
    year: new FormControl('Year'),
  });

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {

    this.setDate();
    this.disabledRegister();
    this.detectChanges();
    this.disableForm();
  }



  detectChanges() {
    this.registrationForm.controls['email'].valueChanges.subscribe(
      value => {
        this.disabledRegister();
        this.findByEmail(value).subscribe((response) => {
          if (response.data) {
            this.isEmailRegistered = true;
            alert('Email Already Registered');
          } else {
            this.isEmailRegistered = false;
          }
        });
      }
    );

    this.registrationForm.controls['mobilePhone'].valueChanges.subscribe(
      value => {
        this.disabledRegister();
        this.findByMobilePhone(value).subscribe((response) => {
          if (response.data) {
            this.isMobileNumberRegistered = true;
            alert('Mobile Number Already Registered');
          } else {
            this.isMobileNumberRegistered = false;
          }
        });
      }
    );

    this.registrationForm.controls['firstName'].valueChanges.subscribe(
      value => {
        this.disabledRegister();
      }
    );

    this.registrationForm.controls['lastName'].valueChanges.subscribe(
      value => {
        this.disabledRegister();
      }
    );
  }

  register() {
    const payLoad = this.setPayload();
    this.submitRegistration(payLoad).subscribe((response) => {
      if(response.data){
        this.disableForm();
        this.showLoginButton = true;
      }
    });
  }

  setPayload(): any {
    const data: any = {};
    data.mobilePhone = this.registrationForm.controls['mobilePhone'].value;
    data.firstName = this.registrationForm.controls['firstName'].value;
    data.lastName = this.registrationForm.controls['lastName'].value;
    data.email = this.registrationForm.controls['email'].value;
    data.gender = this.registrationForm.controls['gender'].value;
    console.log(this.registrationForm.controls['date'].value)
    console.log(this.registrationForm.controls['month'].value)
    console.log(this.registrationForm.controls['year'].value)
    if(this.registrationForm.controls['date'].value == "Date" || this.registrationForm.controls['month'].value == "Month" ||
      this.registrationForm.controls['year'].value == "Year"){
      data.dateBirth = "";
    } else {
      data.dateBirth = this.registrationForm.controls['date'].value +'/'+
      this.registrationForm.controls['month'].value +'/'+
      this.registrationForm.controls['year'].value;
    }

    return data;
  }

  get mobilePhone() {
    return this.registrationForm.get('mobilePhone');
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get email() {
    return this.registrationForm.get('email');
  }


  findByMobilePhone(mobilePhone: string): Observable<any> {
    return this.http.get(url + '/checkMobilePhone/' + mobilePhone);
  }

  findByEmail(email: string): Observable<any> {
    return this.http.get(url + '/checkEmail/?email=' + email);
  }

  submitRegistration(payload: any): Observable<any> {
    return this.http.post(url + '/registration', payload);
  }

  disableForm() {
    document.getElementById('submit_form')
      .addEventListener('click', function() {
        document.getElementById('registration_form')
          .classList
          .toggle('disable-form');

      });
  }

  setDate() {
    for (let i = 10; i <= 31; i++) {
      this.date.push(i);
    }
    for (let i = 1990; i <= 2020; i++) {
      this.year.push(i);
    }
  }

  disabledRegister(){
    this.isRegisterButtonDisabled = (this.registrationForm.controls['mobilePhone'].value == ''
      || this.registrationForm.controls['firstName'].value == ''
      || this.registrationForm.controls['lastName'].value == ''
      || this.registrationForm.controls['email'].value == '');

  }

  goToHomePage(pageName: String){
    this.router.navigate([`${pageName}`]);
  }
}
