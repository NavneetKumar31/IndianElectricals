import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlingService } from '../services/error-handling.service';
import { Response } from '../models/response';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryBaseUrl = 'http://localhost:3000/categories/';
  private subCategoryBaseUrl = 'http://localhost:3000/subCategories/';

  constructor( private _httpClient: HttpClient, private _error: ErrorHandlingService ) { }

  getAllCategories(): Observable<Response> {
    return this._httpClient.get(this.categoryBaseUrl)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  addCategory(newCategory): Observable<Response> {
    return this._httpClient.post(this.categoryBaseUrl, newCategory, httpOptions)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  updateCategory(category): Observable<Response> {
    const url = this.categoryBaseUrl + category._id;
    return this._httpClient.patch(url, category, httpOptions)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  deleteCategoryById(id: string): Observable<Response> {
    const url = this.categoryBaseUrl + id;
    return this._httpClient.delete(url)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  deleteAllCategory(): Observable<Response> {
    return this._httpClient.delete(this.categoryBaseUrl, httpOptions)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  addSubcategory(newSubcategory): Observable<Response> {
    return this._httpClient.post(this.subCategoryBaseUrl, newSubcategory, httpOptions)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  updateSubCategory(subcategory): Observable<Response> {
    const url = this.subCategoryBaseUrl + subcategory._id;
    return this._httpClient.patch(url, subcategory, httpOptions)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  deleteSubcategoriesByCategoryId(category): Observable<Response> {
    const url = this.subCategoryBaseUrl + 'category/' + category._id;
    return this._httpClient.delete(url, httpOptions)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  deleteSubcatgeoryById(subcategory): Observable<Response> {
    const url = this.subCategoryBaseUrl + subcategory._id;
    return this._httpClient.delete(url, httpOptions)
    .pipe(
      catchError(this._error.handleError)
    );
  }

  deleteAllSubcategory(): Observable<Response> {
    return this._httpClient.delete(this.subCategoryBaseUrl, httpOptions)
    .pipe(
      catchError(this._error.handleError)
    );
  }
}
