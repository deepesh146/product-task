import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environment';
import { Root, UserResponse } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<Root | null>;
    public user: Observable<Root | null>;
    private _socketId: string;
   
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }
    
    public get socketId(): string {
        return this._socketId;
    }
    public set socketId(value: string) {
        this._socketId = value;
    }

    login(body: object) {
        return this.http.post<UserResponse>(`${environment.apiUrl}/auth/login`, body)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.data));
                this.userSubject.next(user.data);
                return user;
            }));
    }

    register(body: object) {
        return this.http.post<UserResponse>(`${environment.apiUrl}/auth/register`, body)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.data));
                this.userSubject.next(user.data);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }

    forgotPassword(body: object) {
        return this.http.post<any>(`${environment.apiUrl}/auth/forgot-password`, body)
    }
}