import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

import { User } from '../../shared/models/user';
import { MessageService } from '../../shared/services/message.service';
import { FlashMessage } from '../../shared/models/flashMessage';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  msg = new FlashMessage();
  availableRoles = [ 'b2c', 'b2b', 'admin', 'vendor'];
  
  users: User[] = [];
  newUser = new User();

  constructor( private _authenticate: AuthenticationService, private _message: MessageService ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  toggleModal(id, status) {
    document.getElementById(id).style.display = status;
  }

  getAllUsers() {
    this._authenticate.getAllUsers().subscribe(data => {
      if (data.success) {
        this.users = data.result;
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
}
