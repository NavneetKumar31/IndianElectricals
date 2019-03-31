import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';

import { observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  isConfigModuleActive = new BehaviorSubject<boolean>(false);

  constructor( private _router: Router, private _activeRoute: ActivatedRoute ) { }

  checkCurrentRoute() {
    this._router.events.subscribe((event: Event) => {
      if ( event instanceof NavigationEnd) {
        if ( (event.url.search('config') != -1) ) {
          console.log('header & footer removed');
          this.isConfigModuleActive.next(true);
        } else {
          console.log('header & footer exists');
          this.isConfigModuleActive.next(false);
        }
      }
    });
  }

  routeTo(path: String) {
    this._router.navigate([path.toLowerCase()]);
    this.checkCurrentRoute();
  }

  childRouteTo(parentPath, childPath: String) {
    const parentModule = '/' + parentPath;
    this._router.navigate([parentModule, childPath.toLowerCase()]);
    this.checkCurrentRoute();
  }
}
