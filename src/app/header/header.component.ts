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
  isConfigModule: boolean;

  constructor(private _routing: RoutingService, private _authentication: AuthenticationService) { }

  ngOnInit() {
    this._routing.isConfigModuleActive.subscribe(data => {
      this.isConfigModule = data;
    });
    
    this._authentication.IsUserLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.user = JSON.parse(localStorage.getItem('user'));
    });

    this.isLoggedIn = this._authentication.loggedIn();
    
    // this.changeClassOnLogin(this._authentication.loggedIn());

    if (localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  routeTo(path) {
    this._routing.routeTo(path);
  }

  // changeClassOnLogin(value) {
  //   this.isLoggedIn = value;
  //   if (!value) {
  //     document.getElementById('mySearchBar').classList.replace('col-10', 'col-12');
  //   } else {
  //     document.getElementById('mySearchBar').classList.replace('col-12', 'col-10');
  //   }
  // }

  logout() {
    this._authentication.IsUserLoggedIn.next(false);
    this._authentication.loggedOut();
    // this.changeClassOnLogin(this._authentication.loggedIn());
  }

}
