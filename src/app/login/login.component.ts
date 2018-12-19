import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../shared/models/user';
import { AuthenticationService } from '../shared/services/authentication.service';
import { RoutingService } from '../shared/services/routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private user = new User();

  constructor( private _routing: RoutingService, private _formBuilder: FormBuilder, private _authentication: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.user.email = this.f.email.value;
    this.user.password = this.f.password.value;

    console.log(this.user);

    this._authentication.authenticateUser(this.user).subscribe(data => {
      if (data.success) {
        this.user = data.result;
        this._authentication.storeUserData(data);
        this._authentication.IsUserLoggedIn.next(true);
        console.log(this.user);
        this.routeTo('home');
      }
    },
    err => {
      console.error(err);
    });
  }

  routeTo(path: String) {
    this._routing.routeTo(path);
  }
}
