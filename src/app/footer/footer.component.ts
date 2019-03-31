import { Component, OnInit } from '@angular/core';

import { RoutingService } from '../shared/services/routing.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isConfigModule: boolean;

  constructor( private _routing: RoutingService ) { }

  ngOnInit() {
    this._routing.isConfigModuleActive.subscribe(data => {
      this.isConfigModule = data;
    });
  }

}
