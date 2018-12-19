import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [CategoryComponent, SubcategoryComponent, UserComponent, ProductComponent],
  imports: [
    CommonModule
  ]
})
export class ConfigurationModule { }
