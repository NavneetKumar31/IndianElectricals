import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

export class UserService {

    private baseUrl = 'http://localhost:3000/users/';

    constructor(private _http: HttpClient, private _error: ErrorHandlingService, private _router: RoutingService) { }

    getAllUsers(): Observable<Response> {
        return this._http.get(this.baseUrl, httpOptions)
        .pipe(
            catchError(this._error.handleError)
        );
    }

    addUser(user): Observable<Response> {
        const url = this.baseUrl + 'register/';
        return this._http.post(url, user, httpOptions)
        .pipe(
            catchError(this._error.handleError)
        );
    }
}
