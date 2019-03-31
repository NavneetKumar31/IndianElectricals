import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserHomeComponent } from './user-home/user-home.component';
import { ProfileComponent } from './profile/profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const userRoutes: Routes = [
  { path: 'user', component: UserHomeComponent,
    children: [
      { path: '', component: UserHomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'my-orders', component: MyOrdersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})

export class UserRoutingModule {}
