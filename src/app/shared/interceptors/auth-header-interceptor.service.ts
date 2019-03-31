import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
declare var getDecryptedData: any;

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor {

  token = '';

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') !== null) {
      this.token = getDecryptedData(localStorage.getItem('token'));
    }

    const updatedRequest = request.clone({ setHeaders: { 'Authorization': 'Bearer ' + this.token } });
    return next.handle(updatedRequest);
  }
}
