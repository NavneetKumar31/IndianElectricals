import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';

import { SingleproductComponent } from './singleproduct/singleproduct.component';
import { MultipleproductComponent } from './multipleproduct/multipleproduct.component';
import { CartComponent } from './cart/cart.component';
import { ProductHomeComponent } from './product-home/product-home.component';

@NgModule({

  declarations: [
    SingleproductComponent,
    MultipleproductComponent,
    CartComponent,
    ProductHomeComponent
  ],

  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
