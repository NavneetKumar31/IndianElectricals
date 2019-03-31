import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';
import { Category, SubCategory } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';
import { MessageService } from '../../shared/services/message.service';
import { FlashMessage } from '../../shared/models/flashMessage';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  msg = new FlashMessage();
  products: Product[] = [];
  newProduct = new Product();
  selectedProduct = new Product();

  selectedFile: File = null;

  categories: Category[] = [];
  selectedCategory = new Category();
  subcategories: SubCategory[] = [];
  selectedSubcategory = new SubCategory();

  isAllProductSelected = false;
  canModified = false;
  canAddNew = false;

  constructor( private _product: ProductService, private _message: MessageService,
  private _category: CategoryService ) { }

  ngOnInit() {
    this.selectedCategory.name = 'All';
    this.selectedSubcategory.name = 'All';
    this.getAllProducts();
    this.getAllCategory();
  }

  toggleModal(id, status) {
    if (id === 'addModal' && status === 'none') {
      this.newProduct.name = '';
      this.newProduct.description = '';
      this.newProduct.pricing_details = {};
      this.newProduct.manufacture_details = {};
    }
    document.getElementById(id).style.display = status;
  }

  SelectAllProducts () {
    this.isAllProductSelected = !this.isAllProductSelected;
    this.canModified = false;
    this.products.forEach(product => {
      product.isSelected = this.isAllProductSelected;
    });
  }

  selecteProduct(product: Product) {
    if (!product.isSelected) {
      this.canModified = true;
      product.isSelected = !product.isSelected;
      this.selectedProduct = product;
      this.products.forEach(element => {
        if (element._id !== product._id) {
          element.isSelected = !product.isSelected;
        }
      });
    } else {
      this.canModified = false;
    }
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.subcategories = category.subCategories;
    this.selectedSubcategory = {};
    this.selectedSubcategory.name = 'select subcategory';
  }

  selectSubCategory(subcategory: SubCategory) {
    this.selectedSubcategory = subcategory;
    this.canAddNew = true;
  }

  resetCategoryFilter() {
    this.canAddNew = false;
    this.selectedCategory = {};
    this.selectedCategory.name = 'select subcategory';
    this.subcategories = [];
  }

  resetSubCategoryFilter() {
    this.canAddNew = false;
    this.selectedSubcategory = {};
    this.selectedSubcategory.name = 'all';
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  getAllCategory() {
    this._category.getAllCategories().subscribe(data => {
      if (data.success) {
        this.categories = data.result;
      }
    });
  }

  getAllProducts() {
    this._product.getAllProducts().subscribe(data => {
      if (data.success) {
        this.products = data.result;
        this.products.forEach(product => {
          product.pricing_details.net_profit = 
            (product.pricing_details.selling_price -
            ((product.pricing_details.selling_price * product.pricing_details.discount) / 100))
            - product.pricing_details.buying_price;
        });
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

  addProduct() {
    if (this.selectedFile != null) {
      let fd = new FormData();
      fd.append('productImage', this.selectedFile, this.selectedFile.name);
      this._product.uploadProductImage(fd).subscribe(data => {
        if (data.success) {
          this.newProduct.category = this.selectedCategory._id;
          this.newProduct.subcategory = this.selectedSubcategory._id;
          this.newProduct.productImage = data.result;
          this._product.addProduct(this.newProduct).subscribe(data => {
            if (data.success) {
              this.getAllProducts();
              this.selectedFile = null;
              this.newProduct = new Product();
              this.toggleModal('addModal', 'none');
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
      },
      err => {
        console.error(err);
        this.msg.severity = 'error';
        this.msg.summary = 'Error';
        this.msg.details = err.msg;
        this._message.changeMessage(this.msg);
      });
    } else {
      this._product.addProduct(this.newProduct).subscribe(data => {
        if (data.success) {
          this.getAllProducts();
          this.toggleModal('addModal', 'none');
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
  }

  updateProduct() {
    if (this.selectedFile != null) {
      const oldProduct = {
        'productImage': this.selectedProduct.productImage
      };
      const fd = new FormData();
      fd.append('productImage', this.selectedFile, this.selectedFile.name);
      this._product.uploadProductImage(fd).subscribe(data => {
        if (data.success) {
          this.selectedProduct.productImage = data.result;
          this._product.updateProduct(this.selectedProduct).subscribe(data => {
            if (data.success) {
              this.getAllProducts();
              this.toggleModal('updateModal', 'none');
              this.selectedProduct = new Product();
              this._product.deleteProductImage(oldProduct).subscribe(data => {
                console.log(data);
              });
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
      });
    } else {
      this._product.updateProduct(this.selectedProduct).subscribe(data => {
        if (data.success) {
          this.getAllProducts();
          this.toggleModal('updateModal', 'none');
          this.selectedProduct = new Product();
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
  }

  deleteProduct() {
    if (this.isAllProductSelected) {
      this._product.deleteAllProduct().subscribe(data => {
        if (data.success) {
          this.isAllProductSelected = false;
          this.getAllProducts();
        }
      },
      err => {
        console.error(err);
        this.msg.severity = 'error';
        this.msg.summary = 'Error';
        this.msg.details = err.msg;
        this._message.changeMessage(this.msg);
      });
    } else {
      this._product.deleteProduct(this.selectedProduct).subscribe(data => {
        if (data.success) {
          this.getAllProducts();
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
  }
}
