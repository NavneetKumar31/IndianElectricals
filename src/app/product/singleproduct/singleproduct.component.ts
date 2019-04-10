import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RoutingService } from '../../shared/services/routing.service';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {

  selectedProduct: Product = new Product();
  similarProducts: Product[] = [];

  constructor( private _product: ProductService, private _routing: RoutingService, private _activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe( params => {
      console.log(params['_id']);
      this._product.getProductById(params['_id']).subscribe( selectedProductResponse => {
        console.log(selectedProductResponse.result);
        this.selectedProduct = selectedProductResponse.result[0];
        this.selectedProduct.productImage = 'http://localhost:3000/' + this.selectedProduct.productImage;

        this._product.getProductBySubCategory(this.selectedProduct.subcategory).subscribe( similarProductsResponse => {
          this.similarProducts = similarProductsResponse.result;
          this.similarProducts = this.similarProducts.filter((val, i) => val._id !== this.selectedProduct._id);
          this.similarProducts.forEach(product => {
            product.productImage = 'http://localhost:3000/' + product.productImage;
          });
          console.log(this.similarProducts);
        });
      });
    });
  }

  selectProduct(selectedProduct: Product) {
    this.childRouteWithParamTo('product', 'single', selectedProduct._id);
  }

  routeTo() {}

  childRouteTo() {}

  childRouteWithParamTo(parent: string, child: string, _id: string) {
    this._routing.childRouteWithParamTo(parent, child, _id);
  }

}
