import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../shared/services/category.service';
import { Category, SubCategory } from '../../shared/models/category';
import { MessageService } from '../../shared/services/message.service';
import { FlashMessage } from '../../shared/models/flashMessage';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  msg = new FlashMessage();
  categories: any[] = [];
  newCategory = new Category();
  selectedCategory = new Category();
  isAllCategorySelected = false;
  category_name = '';
  category_description = '';

  canModified = false;

  subcategories: SubCategory[] = [];
  newSubCategory = new SubCategory();
  newSubcategories: SubCategory[] = [];

  constructor( private _category: CategoryService, private _message: MessageService ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  toggleModal(id, status) {
    if ( id === 'addModal' && status === 'none' ) {
      this.newCategory = {};
      this.newSubcategories = [];
    } else if ( id === 'updateModal' && status === 'none' ) {
      this.selectedCategory = {};
      this.canModified = false;
    }
    document.getElementById(id).style.display = status;
    this.getAllCategories();
  }

  selectAllCategory() {
    this.canModified = false;
    this.isAllCategorySelected = !this.isAllCategorySelected;
    this.categories.forEach(category => {
      category.isSelected = this.isAllCategorySelected;
    });
  }

  selectCategory(category: Category) {
    if (!category.isSelected) {
      this.canModified = true;
      category.isSelected = !category.isSelected;
      this.selectedCategory = category;
      this.categories.forEach(element => {
        if (element._id !== category._id) {
          element.isSelected = !category.isSelected;
        }
      });
    } else {
      this.canModified = false;
    }
  }

  getAllCategories() {
    this._category.getAllCategories().subscribe(data => {
      if (data.success) {
        this.categories = data.result;
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

  addCategory() {
    if (this.newCategory.name !== undefined) {
      this.newCategory.subCategories = [];
      const obj = {
        name: this.newCategory.name,
        description: this.newCategory.description
      };
      this._category.addCategory(obj).subscribe(data => {
        console.log(data);
        if (data.success) {
          this.newCategory = {};
          this.getAllCategories();
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
    } else {
      this.msg.severity = 'error';
      this.msg.summary = 'Subcategory';
      this.msg.details = 'Please give category name first';
      this._message.changeMessage(this.msg);
    }
  }

  updateCategory() {
    this._category.updateCategory(this.selectedCategory).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.getAllCategories();
        this.toggleModal('updateModal', 'none');
        this.toggleModal('addEditSubCategoryModal', 'none');
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

  deleteCategoryById() {
    if (this.isAllCategorySelected) {
      this._category.deleteAllCategory().subscribe(data => {
        if (data.success) {
          this._category.deleteAllSubcategory().subscribe(data => {
            if (data.success) {
              this.newCategory = {};
              this.categories = [];
              this.newSubCategory = {};
              this.newSubcategories = [];
              this.isAllCategorySelected = false;
              this.canModified = false;
            }
          });
        }
      });
    }
    this._category.deleteCategoryById(this.selectedCategory._id).subscribe(data => {
      if (data.result) {
        this.msg.severity = 'success';
        this.msg.summary = 'Category';
        this.msg.details = 'Deleted successfully.'
        this._message.changeMessage(this.msg);
        this.deleteSubcategoriesByCategoryId(this.selectedCategory);
        this.getAllCategories();
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

  addSubcategory() {
    this.newSubCategory.category = this.selectedCategory._id;
    this._category.addSubcategory(this.newSubCategory).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.selectedCategory.subCategories.push(data.result);
        this.newSubCategory = {};
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

  updateSubCategory(subcategory: SubCategory) {
    this._category.updateSubCategory(subcategory).subscribe(data => {
      console.log(data);
    },
    err => {
      console.error(err);
      this.msg.severity = 'error';
      this.msg.summary = 'Error';
      this.msg.details = err.msg;
      this._message.changeMessage(this.msg);
    });
  }

  deleteSubcategoriesByCategoryId(category: Category) {
    this._category.deleteSubcategoriesByCategoryId(category).subscribe(data => {
      if (data.success) {
        // this._category.deleteSubcategoriesByCategoryId(category._id).subscribe(data => {
        //   if (data.success) {
        //     this.getAllCategories();
        //   }
        // });
        this.getAllCategories();
      }
    });
  }

  deleteSubcategorybyId(subcategory: SubCategory) {
    this._category.deleteSubcatgeoryById(subcategory).subscribe(data => {
      if (data.success) {
        this.selectedCategory.subCategories = this.selectedCategory.subCategories.filter((val, i) => val._id !== subcategory._id);
        this._category.getAllCategories();
        this.selectedCategory = {};
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

  resetForm() {
    this.newCategory = {};
    this.newSubCategory = {};
  }
}
