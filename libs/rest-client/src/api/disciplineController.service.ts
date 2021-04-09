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

import {
    HttpClient,
    HttpEvent, HttpHeaders,
    HttpResponse
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { DisciplineDto } from '../model/disciplineDto';
import { BASE_PATH } from '../variables';





@Injectable()
export class DisciplineControllerService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

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
     * createDiscipline
     * 
     * @param disciplineDto disciplineRequestDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createDisciplineUsingPOST(disciplineDto: DisciplineDto, observe?: 'body', reportProgress?: boolean): Observable<DisciplineDto>;
    public createDisciplineUsingPOST(disciplineDto: DisciplineDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DisciplineDto>>;
    public createDisciplineUsingPOST(disciplineDto: DisciplineDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DisciplineDto>>;
    public createDisciplineUsingPOST(disciplineDto: DisciplineDto, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (disciplineDto === null || disciplineDto === undefined) {
            throw new Error('Required parameter disciplineDto was null or undefined when calling createDisciplineUsingPOST.');
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

        return this.httpClient.post<DisciplineDto>(`${this.configuration.basePath}/api/discipline`,
            disciplineDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * editDiscipline
     * 
     * @param disciplineDto disciplineResponseDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public editDisciplineUsingPUT(disciplineDto: DisciplineDto, observe?: 'body', reportProgress?: boolean): Observable<DisciplineDto>;
    public editDisciplineUsingPUT(disciplineDto: DisciplineDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DisciplineDto>>;
    public editDisciplineUsingPUT(disciplineDto: DisciplineDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DisciplineDto>>;
    public editDisciplineUsingPUT(disciplineDto: DisciplineDto, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (disciplineDto === null || disciplineDto === undefined) {
            throw new Error('Required parameter disciplineDto was null or undefined when calling editDisciplineUsingPUT.');
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

        return this.httpClient.put<DisciplineDto>(`${this.configuration.basePath}/api/discipline`,
            disciplineDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getDiscipline
     * 
     * @param disciplineId disciplineId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDisciplineUsingGET(disciplineId: string, observe?: 'body', reportProgress?: boolean): Observable<DisciplineDto>;
    public getDisciplineUsingGET(disciplineId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DisciplineDto>>;
    public getDisciplineUsingGET(disciplineId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DisciplineDto>>;
    public getDisciplineUsingGET(disciplineId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (disciplineId === null || disciplineId === undefined) {
            throw new Error('Required parameter disciplineId was null or undefined when calling getDisciplineUsingGET.');
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

        return this.httpClient.get<DisciplineDto>(`${this.configuration.basePath}/api/discipline/${encodeURIComponent(String(disciplineId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getDisciplines
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDisciplinesUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<DisciplineDto>>;
    public getDisciplinesUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DisciplineDto>>>;
    public getDisciplinesUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DisciplineDto>>>;
    public getDisciplinesUsingGET(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        return this.httpClient.get<Array<DisciplineDto>>(`${this.configuration.basePath}/api/discipline`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * removeDiscipline
     * 
     * @param disciplineId disciplineId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public removeDisciplineUsingDELETE(disciplineId: string, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public removeDisciplineUsingDELETE(disciplineId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public removeDisciplineUsingDELETE(disciplineId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public removeDisciplineUsingDELETE(disciplineId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (disciplineId === null || disciplineId === undefined) {
            throw new Error('Required parameter disciplineId was null or undefined when calling removeDisciplineUsingDELETE.');
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

        return this.httpClient.delete<boolean>(`${this.configuration.basePath}/api/discipline/${encodeURIComponent(String(disciplineId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
