import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductHomeComponent } from './product-home/product-home.component';
import { CartComponent } from './cart/cart.component';
import { SingleproductComponent } from './singleproduct/singleproduct.component';
import { MultipleproductComponent } from './multipleproduct/multipleproduct.component';

const productRoutes: Routes = [
  { path: 'product', component: ProductHomeComponent,
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'single', component: SingleproductComponent },
      { path: 'multiple', component: MultipleproductComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
