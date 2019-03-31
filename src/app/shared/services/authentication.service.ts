import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { RoutingService } from './routing.service';
import { ErrorHandlingService } from './error-handling.service';
import { Response } from '../models/response';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authToken: any;
  isLoggedIn: boolean;
  public IsUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private baseUrl = 'http://localhost:3000/users/';

  constructor( private _http: HttpClient, private _error: ErrorHandlingService, private _router: RoutingService ) { }

  getAllUsers(): Observable<Response> {
    return this._http
    .get(this.baseUrl, httpOptions)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  authenticateUser(user): Observable<Response> {
    const url = this.baseUrl + 'authenticate/';
    return this._http
    .post(url, user, httpOptions)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  registerUser(user): Observable<Response> {
    const url = this.baseUrl + 'register/';
    return this._http
    .post(url, user, httpOptions)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  // jwt() {
  //   // create authorization header with jwt token
  //   const currentToken = localStorage.getItem('id_token');
  //   if (currentToken) {
  //     let headers = new Headers({ 'Authorization': 'Bearer ' + currentToken });
  //     headers.append('Content-Type', 'application/json');
  //     return new RequestOptions({ headers: headers });
  //   }
  // }

  loggedIn() {
    if (localStorage.getItem('token') !== null) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  storeUserData(data: Response) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.result));
  }

  loggedOut() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
