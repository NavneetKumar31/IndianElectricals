import { Component, OnInit } from '@angular/core';

import { RoutingService } from '../../shared/services/routing.service';

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.css']
})
export class ConfigHomeComponent implements OnInit {

  constructor( private _routing: RoutingService ) { }

  ngOnInit() {
    // for hiding header and footer
    this._routing.isConfigModuleActive.next(true);
  }

  routeTo(path: string) {
    this._routing.routeTo(path.toLowerCase());
  }

  childRouteTo(parentPath: string, childPath: string) {
    this._routing.childRouteTo(parentPath.toLowerCase(), childPath.toLowerCase());
  }
}
