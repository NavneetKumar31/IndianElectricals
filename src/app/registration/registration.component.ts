import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../shared/services/authentication.service';
import { RoutingService } from '../shared/services/routing.service';
import { User } from '../shared/models/user';
declare var getEncryptedData: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User();
  registrationForm: FormGroup;

  constructor(private _authentication: AuthenticationService, private _router: RoutingService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this._formBuilder.group({
      role: ['', Validators.required],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  register() {
    this.user.role = this.f.role.value;
    this.user.name = this.f.name.value;
    this.user.email = this.f.email.value;
    this.user.mobile = this.f.mobile.value;
    this.user.password = getEncryptedData(this.f.password.value);

    this._authentication.registerUser(this.user).subscribe(data => {
      if (data.success) {
        this.user = data.result;
        this._router.routeTo('login');
      }
    },
    err => {
      console.error(err);
    });
  }

  routeTo(path: String) {
    this._router.routeTo(path);
  }

}
