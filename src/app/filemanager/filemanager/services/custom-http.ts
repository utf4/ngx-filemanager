import { Injectable } from '@angular/core';
import { Http, Headers, ConnectionBackend, RequestOptions, RequestOptionsArgs, Request, Response } from '@angular/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import 'rxjs/add/operator/catch';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CustomHttp extends Http {
    private headers: Headers;
    private baseUrl = environment.apiUrl;
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
        this.headers = new Headers();
    }

    private setBearerToken(options?: RequestOptionsArgs) {
        if (!options) {
            options = { headers: new Headers() };
        }
        if (!!localStorage.getItem('currentUser')) {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            options.headers.append('Authorization', 'JWT ' + currentUser.token || 'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJpZDoyLGFwcDphZG1pbiIsImV4cCI6MTUwNDMwNDMwOCwiaWF0IjoxNTAxNzEyMzA4LCJpc3MiOiJRYmVyIiwianRpIjoiNDQwNGRlNDQtOGViNC00NDM2LTgyMjgtYmQzODllZDc2YWY5IiwicGVtIjp7fSwic3ViIjoiaWQ6MixhcHA6YWRtaW4iLCJ0eXAiOiJ0b2tlbiJ9.AdQWZfvW0W1WsGqAbr81pUvvbBxZNM7AyiphB2Eg2qOQ7Yoc5ZzwTlFnN22TKKu8c8oOmDB9l6LxDR9hVf6guUffAduADasnmxlLoUfqc_me5SC3qygPvikx22U5Fjkgb4CQ8E9n1KsYxVJCUHw0JJGGCloK4A7qHuJIb2ossmE4BWEh');
        } else {
            options.headers.delete('Authorization');
        }
        return options;
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        options = this.setBearerToken(options);
        return super.request(url, options).catch(this.catchAuthError(this));
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.setBearerToken(options);
        return super.get(this.baseUrl + url, options).catch(this.catchAuthError(this));
    }

    public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.setBearerToken(options);
        return super.post(url, body, options);
    }

    public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.setBearerToken(options);
        return super.put(url, body, options);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.setBearerToken(options);
        return super.delete(url, options);
    }


    private catchAuthError(self: CustomHttp) {
        return (res: Response) => {
            return Observable.throw(res);
        };
    }
}