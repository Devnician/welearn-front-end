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
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../configuration';
import { CustomHttpUrlEncodingCodec } from '../encoder';
import { Resource } from '../model/resource';
import { ResourceDto } from '../model/resourceDto';
import { BASE_PATH } from '../variables';

@Injectable()
export class ResourceControllerService {
  protected basePath = 'http://localhost:8080';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration;
      this.configuration.basePath =
        configuration.basePath || basePath || this.basePath;
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
   * delete
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteUsingDELETE(
    id: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public deleteUsingDELETE(
    id: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public deleteUsingDELETE(
    id: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public deleteUsingDELETE(
    id: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling deleteUsingDELETE.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (JWT) required
    if (this.configuration.apiKeys['Authorization']) {
      headers = headers.set(
        'Authorization',
        this.configuration.apiKeys['Authorization']
      );
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.delete<boolean>(
      `${this.configuration.basePath}/api/resource/${encodeURIComponent(
        String(id)
      )}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * downloadResource
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public downloadResourceUsingGET(
    id: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Resource>;
  public downloadResourceUsingGET(
    id: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Resource>>;
  public downloadResourceUsingGET(
    id: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Resource>>;
  public downloadResourceUsingGET(
    id: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling downloadResourceUsingGET.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (JWT) required
    if (this.configuration.apiKeys['Authorization']) {
      headers = headers.set(
        'Authorization',
        this.configuration.apiKeys['Authorization']
      );
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<Resource>(
      `${
        this.configuration.basePath
      }/api/resource/download/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * edit
   *
   * @param resourceId resourceId
   * @param accessibleAll accessibleAll
   * @param disciplineId disciplineId
   * @param scheduleId scheduleId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public editUsingPUT(
    resourceId: string,
    accessibleAll?: boolean,
    disciplineId?: string,
    scheduleId?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ResourceDto>;
  public editUsingPUT(
    resourceId: string,
    accessibleAll?: boolean,
    disciplineId?: string,
    scheduleId?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ResourceDto>>;
  public editUsingPUT(
    resourceId: string,
    accessibleAll?: boolean,
    disciplineId?: string,
    scheduleId?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ResourceDto>>;
  public editUsingPUT(
    resourceId: string,
    accessibleAll?: boolean,
    disciplineId?: string,
    scheduleId?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (resourceId === null || resourceId === undefined) {
      throw new Error(
        'Required parameter resourceId was null or undefined when calling editUsingPUT.'
      );
    }

    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (accessibleAll !== undefined && accessibleAll !== null) {
      queryParameters = queryParameters.set(
        'accessibleAll',
        <any>accessibleAll
      );
    }
    if (disciplineId !== undefined && disciplineId !== null) {
      queryParameters = queryParameters.set('disciplineId', <any>disciplineId);
    }
    if (resourceId !== undefined && resourceId !== null) {
      queryParameters = queryParameters.set('resourceId', <any>resourceId);
    }
    if (scheduleId !== undefined && scheduleId !== null) {
      queryParameters = queryParameters.set('scheduleId', <any>scheduleId);
    }

    let headers = this.defaultHeaders;

    // authentication (JWT) required
    if (this.configuration.apiKeys['Authorization']) {
      headers = headers.set(
        'Authorization',
        this.configuration.apiKeys['Authorization']
      );
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['multipart/form-data'];

    return this.httpClient.put<ResourceDto>(
      `${this.configuration.basePath}/api/resource/upload`,
      null,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * findAll
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findAllUsingGET3(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<ResourceDto>>;
  public findAllUsingGET3(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<ResourceDto>>>;
  public findAllUsingGET3(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<ResourceDto>>>;
  public findAllUsingGET3(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (JWT) required
    if (this.configuration.apiKeys['Authorization']) {
      headers = headers.set(
        'Authorization',
        this.configuration.apiKeys['Authorization']
      );
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<Array<ResourceDto>>(
      `${this.configuration.basePath}/api/resource`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
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
  public getByIdUsingGET2(
    id: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ResourceDto>;
  public getByIdUsingGET2(
    id: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ResourceDto>>;
  public getByIdUsingGET2(
    id: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ResourceDto>>;
  public getByIdUsingGET2(
    id: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling getByIdUsingGET2.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (JWT) required
    if (this.configuration.apiKeys['Authorization']) {
      headers = headers.set(
        'Authorization',
        this.configuration.apiKeys['Authorization']
      );
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<ResourceDto>(
      `${this.configuration.basePath}/api/resource/${encodeURIComponent(
        String(id)
      )}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * save
   *
   * @param accessibleAll accessibleAll
   * @param disciplineId disciplineId
   * @param scheduleId scheduleId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public saveUsingPOST(
    accessibleAll?: boolean,
    disciplineId?: string,
    scheduleId?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ResourceDto>;
  public saveUsingPOST(
    accessibleAll?: boolean,
    disciplineId?: string,
    scheduleId?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ResourceDto>>;
  public saveUsingPOST(
    accessibleAll?: boolean,
    disciplineId?: string,
    scheduleId?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ResourceDto>>;
  public saveUsingPOST(
    accessibleAll?: boolean,
    disciplineId?: string,
    scheduleId?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (accessibleAll !== undefined && accessibleAll !== null) {
      queryParameters = queryParameters.set(
        'accessibleAll',
        <any>accessibleAll
      );
    }
    if (disciplineId !== undefined && disciplineId !== null) {
      queryParameters = queryParameters.set('disciplineId', <any>disciplineId);
    }
    if (scheduleId !== undefined && scheduleId !== null) {
      queryParameters = queryParameters.set('scheduleId', <any>scheduleId);
    }

    let headers = this.defaultHeaders;

    // authentication (JWT) required
    if (this.configuration.apiKeys['Authorization']) {
      headers = headers.set(
        'Authorization',
        this.configuration.apiKeys['Authorization']
      );
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['multipart/form-data'];

    return this.httpClient.post<ResourceDto>(
      `${this.configuration.basePath}/api/resource/upload`,
      null,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
