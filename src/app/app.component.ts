import { Component, OnInit } from '@angular/core';

import { MessageService } from './shared/services/message.service';
import { FlashMessage } from './shared/models/flashMessage';
import { isUndefined } from 'util';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentMsg = new FlashMessage();
  
  constructor ( private _message: MessageService ) {}

  ngOnInit() {
    this._message.msgObservable.subscribe(msg => {
      this.currentMsg = msg;
      this.onMessage(this.currentMsg);

      // create an timer to close message afetr 5 sec
      const msgTimer = timer(5000);
      msgTimer.subscribe(data => {
        console.log('timer triggered');
        document.getElementById('flashMessage').style.display = 'none';
      })
    });
  }

  onMessage(msg: FlashMessage) {
    document.getElementById('flashMessage').style.display = 'block';

    if (!isUndefined(this.currentMsg.severity)) {
      switch (this.currentMsg.severity.toLowerCase()) {
        case 'success':
          if (document.getElementById('flashMessage').classList.contains('alert-danger')) {
            document.getElementById("flashMessage").classList.remove('alert-danger');
          }
          if (document.getElementById('flashMessage').classList.contains('alert-info')) {
            document.getElementById("flashMessage").classList.remove('alert-info');
          }
          if (!document.getElementById("flashMessage").classList.contains('alert-success')) {
            document.getElementById("flashMessage").classList.add('alert-success');
          }

          break;

        case 'info':
          if (document.getElementById('flashMessage').classList.contains('alert-danger')) {
            document.getElementById("flashMessage").classList.remove('alert-danger');
          }
          if (document.getElementById('flashMessage').classList.contains('alert-success')) {
            document.getElementById("flashMessage").classList.remove('alert-success');
          }
          if (!document.getElementById('flashMessage').classList.contains('alert-info')) {
            document.getElementById("flashMessage").classList.add('alert-info');
          }
          break;

        case 'error':
          if (document.getElementById('flashMessage').classList.contains('alert-info')) {
            document.getElementById("flashMessage").classList.remove('alert-info');
          }
          if (document.getElementById('flashMessage').classList.contains('alert-success')) {
            document.getElementById("flashMessage").classList.remove('alert-success');
          }
          if (!document.getElementById('flashMessage').classList.contains('alert-danger')) {
            document.getElementById("flashMessage").classList.add('alert-danger');
          }
          break;
        }
    }
  }
}
