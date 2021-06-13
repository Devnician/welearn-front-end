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
import { EvaluationMarkDto } from '../model/evaluationMarkDto';
import { BASE_PATH } from '../variables';




@Injectable()
export class EvaluationMarkControllerService {

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
     * createMark
     * 
     * @param evaluationMarkDto evaluationMarkDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createMarkUsingPOST(evaluationMarkDto: EvaluationMarkDto[], observe?: 'body', reportProgress?: boolean): Observable<EvaluationMarkDto>;
    public createMarkUsingPOST(evaluationMarkDto: EvaluationMarkDto[], observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EvaluationMarkDto>>;
    public createMarkUsingPOST(evaluationMarkDto: EvaluationMarkDto[], observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EvaluationMarkDto>>;
    public createMarkUsingPOST(evaluationMarkDto: EvaluationMarkDto[], observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (evaluationMarkDto === null || evaluationMarkDto === undefined) {
            throw new Error('Required parameter evaluationMarkDto was null or undefined when calling createMarkUsingPOST.');
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

        return this.httpClient.post<EvaluationMarkDto[]>(`${this.configuration.basePath}/api/evaluationMark`,
            evaluationMarkDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteMark
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteMarkUsingDELETE(id: string, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public deleteMarkUsingDELETE(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public deleteMarkUsingDELETE(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public deleteMarkUsingDELETE(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteMarkUsingDELETE.');
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

        return this.httpClient.delete<boolean>(`${this.configuration.basePath}/api/evaluationMark/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * editEvaluationMark
     * 
     * @param evaluationMarkDto evaluationMarkDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public editEvaluationMarkUsingPUT(evaluationMarkDto: EvaluationMarkDto, observe?: 'body', reportProgress?: boolean): Observable<EvaluationMarkDto>;
    public editEvaluationMarkUsingPUT(evaluationMarkDto: EvaluationMarkDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EvaluationMarkDto>>;
    public editEvaluationMarkUsingPUT(evaluationMarkDto: EvaluationMarkDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EvaluationMarkDto>>;
    public editEvaluationMarkUsingPUT(evaluationMarkDto: EvaluationMarkDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (evaluationMarkDto === null || evaluationMarkDto === undefined) {
            throw new Error('Required parameter evaluationMarkDto was null or undefined when calling editEvaluationMarkUsingPUT.');
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

        return this.httpClient.put<EvaluationMarkDto>(`${this.configuration.basePath}/api/evaluationMark`,
            evaluationMarkDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * findAll
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<EvaluationMarkDto>>;
    public findAllUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<EvaluationMarkDto>>>;
    public findAllUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<EvaluationMarkDto>>>;
    public findAllUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<EvaluationMarkDto>>(`${this.configuration.basePath}/api/evaluationMark`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getById
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByIdUsingGET(id: string, observe?: 'body', reportProgress?: boolean): Observable<EvaluationMarkDto>;
    public getByIdUsingGET(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EvaluationMarkDto>>;
    public getByIdUsingGET(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EvaluationMarkDto>>;
    public getByIdUsingGET(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getByIdUsingGET.');
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

        return this.httpClient.get<EvaluationMarkDto>(`${this.configuration.basePath}/api/evaluationMark/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
