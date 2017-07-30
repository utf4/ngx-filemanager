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
            options.headers.append('Authorization', 'JWT ' + currentUser.token);
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