import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../shared/services/authentication.service';
import { RoutingService } from '../shared/services/routing.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = new User();
  isLoggedIn: boolean;

  constructor( private _routing: RoutingService, private _authentication: AuthenticationService ) { }

  ngOnInit() {
    this._authentication.IsUserLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.user = JSON.parse(localStorage.getItem('user'));
    });
    this.isLoggedIn = this._authentication.loggedIn();
    if (localStorage.getItem('user') !== null) {
      console.log('user present');
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  routeTo(path) {
    this._routing.routeTo(path);
  }

  logout() {
    this._authentication.IsUserLoggedIn.next(false);
    this._authentication.loggedOut();
  }
}
