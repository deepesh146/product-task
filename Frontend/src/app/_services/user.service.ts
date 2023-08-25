import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../environment';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { ProductRoot } from '@app/_models/products';
import { AddProductResponse, Product } from '@app/_models/addProductResponse';
import { BehaviorSubject, Observable } from 'rxjs';
import { walletHistory } from '@app/_models/wallethistoryResponse';
import { BalanceResponse } from '@app/_models/balanceResponse';

@Injectable({ providedIn: 'root' })
export class UserService {
    // private receivedProduct: boolean = false;
    private receivedProduct: BehaviorSubject<any> = new BehaviorSubject<any>(false);


    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

    setReceivedProduct(productData: boolean) {
        this.receivedProduct.next(productData);
    }

    getReceivedProduct(): Observable<any> {
        return this.receivedProduct.asObservable();
    }

    getAll(pagination: any) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("sortBy", pagination.sortBy);
        queryParams = queryParams.append("page", pagination.page);
        queryParams = queryParams.append("limit", pagination.limit);
        if (pagination.search) {
            queryParams = queryParams.append("search", pagination.search);
        }
        return this.http.get<ProductRoot>(`${environment.apiUrl}/product/getAllProducts`, { params: queryParams });
    }

    addProduct(body: any, socketId: string) {
        console.log("body", body);
        const userValue = this.authenticationService.userValue;
        const userId = userValue?.user.id
        body.userId = userValue?.user.id;
        body.socketId = socketId
        return this.http.post<AddProductResponse>(`${environment.apiUrl}/product`, body)
    }

    getProductById(id: string) {
        console.log("id", id);
        const userValue = this.authenticationService.userValue;
        const userId = userValue?.user.id
        // body.userId = <any>userValue?.user.id;

        return this.http.get<AddProductResponse>(`${environment.apiUrl}/product/${id}`)
    }

    deleteProduct(productId: string) {
        console.log("product id", productId);
        const userValue = this.authenticationService.userValue;
        const userId = userValue?.user.id
        let url = `${environment.apiUrl}/product/${productId}`;
        return this.http.delete(url)
    }

    updateProduct(body: any, productId: string) {
        console.log("product id", productId);
        const userValue = this.authenticationService.userValue;
        const userId = userValue?.user.id
        let url = `${environment.apiUrl}/product/${productId}`;
        return this.http.patch<AddProductResponse>(url, body)
    }

    // wallet APIs
    getWalletHistory() {
        const userValue = this.authenticationService.userValue;
        const userId = userValue?.user.id
        let url = `${environment.apiUrl}/wallet/getAllTransactions/${userId}`;
        return this.http.get<walletHistory>(url)
    }

    getBalance() {
        const userValue = this.authenticationService.userValue;
        const userId = userValue?.user.id
        let url = `${environment.apiUrl}/wallet/getBalance/${userId}`;
        return this.http.get<BalanceResponse>(url)
    }


    WalletTopUp(body: any) {
        const userValue = this.authenticationService.userValue;
        const userId = userValue?.user.id
        body.userId = userId
        let url = `${environment.apiUrl}/wallet/topup`;
        return this.http.post<any>(url, body)
    }

    purchase(body: any) {
        const userValue = this.authenticationService.userValue;
        const userId = userValue?.user.id
        body.userId = userId
        let url = `${environment.apiUrl}/wallet/purchase`;
        return this.http.post<any>(url, body)
    }



}