import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserHomeComponent } from './user-home/user-home.component';
import { ProfileComponent } from './profile/profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [
    UserHomeComponent,
    ProfileComponent,
    MyOrdersComponent
  ],

  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
