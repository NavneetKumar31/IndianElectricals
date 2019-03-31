import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { MessageService } from './message.service';
import { FlashMessage } from '../models/flashMessage';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  currentMsg = new FlashMessage();

  constructor( private _message: MessageService ) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred ==>', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Server returned error code ${error.status}, ` + ` Error body is ==> `);
      console.error(error.error);
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  }
}
