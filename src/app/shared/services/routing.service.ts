import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor( private _router: Router ) { }

  routeTo(path: String) {
    this._router.navigate([path.toLowerCase()]);
  }
}
