import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
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
export class ProductService {

    private productBaseUrl = 'http://localhost:3000/products/';

    constructor( private _httpClient: HttpClient, private _error: ErrorHandlingService ) { }

    getAllProducts(): Observable<Response> {
        return this._httpClient.get(this.productBaseUrl)
        .pipe(
            catchError(this._error.handleError)
        );
    }

    addProduct(newProduct): Observable<Response> {
        return this._httpClient.post(this.productBaseUrl, newProduct)
        .pipe(
            catchError(this._error.handleError)
        );
    }

    uploadProductImage(formdata): Observable<Response> {
        const url = this.productBaseUrl + 'upload/productImage';
        return this._httpClient.post(url, formdata)
        .pipe(
            catchError(this._error.handleError)
        );
    }

    deleteProductImage(product): Observable<Response> {
        const url = this.productBaseUrl + 'delete/image';
        return this._httpClient.post(url, product, httpOptions)
        .pipe(
            catchError(this._error.handleError)
        );
    }

    updateProduct(updatedProduct): Observable<Response> {
        const url = this.productBaseUrl + updatedProduct._id;
        return this._httpClient.patch(url, updatedProduct, httpOptions)
        .pipe(
            catchError(this._error.handleError)
        );
    }

    deleteProduct(product): Observable<Response> {
        const url = this.productBaseUrl + product._id;
        return this._httpClient.delete(url, httpOptions)
        .pipe(
            catchError(this._error.handleError)
        );
    }

    deleteAllProduct(): Observable<Response> {
        return this._httpClient.delete(this.productBaseUrl, httpOptions)
        .pipe(
            catchError(this._error.handleError)
        );
    }
}
