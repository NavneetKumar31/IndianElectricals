import { Component, OnInit } from '@angular/core';

import { ProductService } from '../shared/services/product.service';
import { CategoryService } from '../shared/services/category.service';
import { MessageService } from '../shared/services/message.service';
import { Product } from '../shared/models/product';
import { Category, SubCategory } from '../shared/models/category';
import { FlashMessage } from '../shared/models/flashMessage';
import { RoutingService } from '../shared/services/routing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  msg = new FlashMessage();

  products: Product[] = [];
  categories: Category[] = [];

  constructor( private _product: ProductService, private _category: CategoryService, private _message: MessageService,
  private _routing: RoutingService ) { }

  ngOnInit() {
    this.getAllCategories();
    this.getAllProducts();
  }

  getAllCategories() {
    this._category.getAllCategories().subscribe(data => {
      if (data.success) {
        this.categories = data.result;
      } else {
        this.categories = [];
      }
    },
    err => {
      console.error(err);
      this.msg.severity = 'error';
      this.msg.summary = 'Error';
      this.msg.details = err.msg;
      this._message.changeMessage(this.msg);
    });
  }

  getAllProducts() {
    this._product.getAllProducts().subscribe(data => {
      if (data.success) {
        this.products = data.result;
        this.products.forEach(product => {
          product.productImage = 'http://localhost:3000/' + product.productImage;
          product.pricing_details.net_profit =
            (product.pricing_details.selling_price -
              ((product.pricing_details.selling_price * product.pricing_details.discount) / 100))
            - product.pricing_details.buying_price;
        });
        console.log(this.products);
      }
    },
    err => {
      console.error(err);
      this.msg.severity = 'error';
      this.msg.summary = 'Error';
      this.msg.details = err.msg;
      this._message.changeMessage(this.msg);
    });
  }

  selectProduct( selectedProduct: Product) {
    console.log(selectedProduct);
    this._product.selectedProduct.next(selectedProduct);
    this.childRouteWithParamTo('product', 'single', selectedProduct._id);
  }

  routeTo(path: string) {
    this._routing.routeTo(path.toLowerCase());
  }

  childRouteTo(parentPath: string, childPath: string) {
    this._routing.childRouteTo(parentPath.toLowerCase(), childPath.toLowerCase());
  }

  childRouteWithParamTo(parentPath: string, childPath: string, id: string) {
    this._routing.childRouteWithParamTo(parentPath.toLowerCase(), childPath.toLowerCase(), id);
  }
}