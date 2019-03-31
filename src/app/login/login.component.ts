import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessageService } from '../shared/services/message.service';
import { FlashMessage } from '../shared/models/flashMessage';
import { AuthenticationService } from '../shared/services/authentication.service';
import { RoutingService } from '../shared/services/routing.service';
import { User } from '../shared/models/user';
declare var getEncryptedData: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  msg = new FlashMessage();
  private user = new User();

  constructor(private _routing: RoutingService, private _formBuilder: FormBuilder,
    private _authentication: AuthenticationService, private _message: MessageService
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
    this.user.password = getEncryptedData(this.f.password.value);

    console.log(this.user);

    this._authentication.authenticateUser(this.user).subscribe(data => {
      if (data.success) {
        this.user = data.result;
        this._authentication.storeUserData(data);
        this._authentication.IsUserLoggedIn.next(true);
        console.log(this.user);
        if (this.user.role.toLowerCase() === 'admin') {
          this._routing.routeTo('config');
        } else {
          this.routeTo('home');
        }
        this.msg.severity = 'success';
        this.msg.summary = 'Login';
        this.msg.details = 'Login Successfully.'
        this._message.changeMessage(this.msg);
      }
    },
    err => {
      console.error(err);
      this.msg.severity = 'error';
      this.msg.summary = 'Error';
      this.msg.details = err.msg;
      this._message.changeMessage(this.msg);
    });
  }

  routeTo(path: String) {
    this._routing.routeTo(path);
  }
}
