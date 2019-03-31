import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfigRoutingModule } from './config-routing.module';

import { DashboradComponent } from './dashborad/dashborad.component';
import { ConfigHomeComponent } from './config-home/config-home.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    DashboradComponent,
    ConfigHomeComponent,
    ProductsComponent,
    UsersComponent,
    CategoriesComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigRoutingModule
  ]
})
export class ConfigurationModule { }
