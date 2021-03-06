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

import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Configuration } from '../configuration';
import { RoleDto } from '../model/roleDto';
import { BASE_PATH } from '../variables';




@Injectable()
export class RoleControllerService {

    protected basePath = environment.restUrl;
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
     * deleteRole
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteRoleUsingDELETE(id: number, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public deleteRoleUsingDELETE(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public deleteRoleUsingDELETE(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public deleteRoleUsingDELETE(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteRoleUsingDELETE.');
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

        return this.httpClient.delete<boolean>(`${this.configuration.basePath}/api/roles/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getRoleById
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getRoleByIdUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<RoleDto>;
    public getRoleByIdUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<RoleDto>>;
    public getRoleByIdUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<RoleDto>>;
    public getRoleByIdUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getRoleByIdUsingGET.');
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

        return this.httpClient.get<RoleDto>(`${this.configuration.basePath}/api/roles/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * listRoles
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listRolesUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<RoleDto>>;
    public listRolesUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<RoleDto>>>;
    public listRolesUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<RoleDto>>>;
    public listRolesUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<RoleDto>>(`${this.configuration.basePath}/api/roles`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * saveRole
     * 
     * @param roleDto role
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveRoleUsingPOST(roleDto: RoleDto, observe?: 'body', reportProgress?: boolean): Observable<RoleDto>;
    public saveRoleUsingPOST(roleDto: RoleDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<RoleDto>>;
    public saveRoleUsingPOST(roleDto: RoleDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<RoleDto>>;
    public saveRoleUsingPOST(roleDto: RoleDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (roleDto === null || roleDto === undefined) {
            throw new Error('Required parameter roleDto was null or undefined when calling saveRoleUsingPOST.');
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

        return this.httpClient.post<RoleDto>(`${this.configuration.basePath}/api/roles/add`,
            roleDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updateRole
     * 
     * @param roleDto roleDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateRoleUsingPUT(roleDto: RoleDto, observe?: 'body', reportProgress?: boolean): Observable<RoleDto>;
    public updateRoleUsingPUT(roleDto: RoleDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<RoleDto>>;
    public updateRoleUsingPUT(roleDto: RoleDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<RoleDto>>;
    public updateRoleUsingPUT(roleDto: RoleDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (roleDto === null || roleDto === undefined) {
            throw new Error('Required parameter roleDto was null or undefined when calling updateRoleUsingPUT.');
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

        return this.httpClient.put<RoleDto>(`${this.configuration.basePath}/api/roles`,
            roleDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
