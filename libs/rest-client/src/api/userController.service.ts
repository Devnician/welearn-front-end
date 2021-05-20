/**
 * WeLearn backend API
 * C1 version of the WeLearn Backend API
 *
 * OpenAPI spec version: 1.0
 * Contact: ivelin.dimitrov9@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { UserDto } from '../model/userDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class UserControllerService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

        if (configuration) {
            this.configuration = configuration;
            this.configuration.basePath = configuration.basePath || basePath || this.basePath;

        } else {
            this.configuration.basePath = basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * deleteUser
     * 
     * @param customerId customerId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteUserUsingDELETE(customerId: string, observe?: 'body', reportProgress?: boolean): Observable<UserDto>;
    public deleteUserUsingDELETE(customerId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserDto>>;
    public deleteUserUsingDELETE(customerId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserDto>>;
    public deleteUserUsingDELETE(customerId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (customerId === null || customerId === undefined) {
            throw new Error('Required parameter customerId was null or undefined when calling deleteUserUsingDELETE.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<UserDto>(`${this.configuration.basePath}/api/users/${encodeURIComponent(String(customerId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getUser
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUserUsingGET(id: string, observe?: 'body', reportProgress?: boolean): Observable<UserDto>;
    public getUserUsingGET(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserDto>>;
    public getUserUsingGET(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserDto>>;
    public getUserUsingGET(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getUserUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<UserDto>(`${this.configuration.basePath}/api/users/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * listUser
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listUserUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<UserDto>>;
    public listUserUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<UserDto>>>;
    public listUserUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<UserDto>>>;
    public listUserUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<UserDto>>(`${this.configuration.basePath}/api/users`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * listUser
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listUserUsingGET1(id: number, observe?: 'body', reportProgress?: boolean): Observable<Array<UserDto>>;
    public listUserUsingGET1(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<UserDto>>>;
    public listUserUsingGET1(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<UserDto>>>;
    public listUserUsingGET1(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling listUserUsingGET1.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<UserDto>>(`${this.configuration.basePath}/api/users/role/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * logout
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public logoutUsingGET(id: string, observe?: 'body', reportProgress?: boolean): Observable<UserDto>;
    public logoutUsingGET(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserDto>>;
    public logoutUsingGET(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserDto>>;
    public logoutUsingGET(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling logoutUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<UserDto>(`${this.configuration.basePath}/api/users/logout/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * saveUser
     * 
     * @param userDto user
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveUserUsingPOST(userDto: UserDto, observe?: 'body', reportProgress?: boolean): Observable<UserDto>;
    public saveUserUsingPOST(userDto: UserDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserDto>>;
    public saveUserUsingPOST(userDto: UserDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserDto>>;
    public saveUserUsingPOST(userDto: UserDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (userDto === null || userDto === undefined) {
            throw new Error('Required parameter userDto was null or undefined when calling saveUserUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<UserDto>(`${this.configuration.basePath}/api/users`,
            userDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updateUser
     * 
     * @param userDto userDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateUserUsingPUT(userDto: UserDto, observe?: 'body', reportProgress?: boolean): Observable<UserDto>;
    public updateUserUsingPUT(userDto: UserDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserDto>>;
    public updateUserUsingPUT(userDto: UserDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserDto>>;
    public updateUserUsingPUT(userDto: UserDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (userDto === null || userDto === undefined) {
            throw new Error('Required parameter userDto was null or undefined when calling updateUserUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<UserDto>(`${this.configuration.basePath}/api/users`,
            userDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
