import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleproductComponent } from './singleproduct/singleproduct.component';
import { MultipleproductComponent } from './multipleproduct/multipleproduct.component';

@NgModule({
  declarations: [SingleproductComponent, MultipleproductComponent],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
