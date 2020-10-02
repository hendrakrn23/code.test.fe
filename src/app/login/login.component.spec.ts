import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {of} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let http : HttpClient;
  let router : Router;

  let fakeService = {

  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: HttpClient, useValue: fakeService},
        { provide: Router, useValue: fakeService},
      ]
    })
    .compileComponents();

    component = new LoginComponent(
        http,
        router
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit',()=>{
    spyOn(component,'setDate');
    spyOn(component,'disabledRegister');
    spyOn(component,'detectChanges');
    spyOn(component,'disableForm');
    component.ngOnInit();
  });

  it('test setDate',()=>{
    component.setDate();
  });

  it('test detectChanges',()=>{
    let response = { data : { }}
    spyOn(component,'findByEmail').and.returnValue(of(response));
    spyOn(component,'findByMobilePhone').and.returnValue(of(response));
    component.detectChanges();
    component.registrationForm.controls['mobilePhone'].setValue('123');
    component.registrationForm.controls['email'].setValue('test@gmail.com');
    component.registrationForm.controls['firstName'].setValue('budi');
    component.registrationForm.controls['lastName'].setValue('setiadi');

  });

  it('test disabledRegister',()=>{
    component.disabledRegister();
  });

  it('test disableForm',()=>{
    component.disableForm();
  });


  it('test register',()=>{
    let response = { data : { }};
    spyOn(component,'submitRegistration').and.returnValue(of(response));
    component.register();
  });


});
