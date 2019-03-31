import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigHomeComponent } from './config-home/config-home.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';

const configRoutes: Routes = [
  { path: 'config', component: ConfigHomeComponent,
    children: [
      { path: '', component: DashboradComponent },
      { path: 'dashboard', component: DashboradComponent },
      { path: 'users', component: UsersComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'products', component: ProductsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(configRoutes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule {}
