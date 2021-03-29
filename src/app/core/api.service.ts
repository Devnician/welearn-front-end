
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from "rxjs/index";
import { environment } from '../../environments/environment';
import { ApiResponse } from "../model/api.response";
import { Role } from '../model/role.model';
import { User } from '../model/user.model';

@Injectable()

export class ApiService {

  host: string = environment.restUrl + 'api/';
  tokenUrl: string = environment.restUrl;

  usersUrl: string = this.host + 'users/';
  errorUrl: string = this.host + 'support/err'
  usersRolesUrl: string = this.host + 'roles/';
  usersMenusUrl: string = this.host + 'users/menus/';

  disciplinesUrl: string = this.host + 'discipline/'

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }
  ////////////////////////////////////////////////////////////////
  //
  // USER
  //
  ////////////////////////////////////////////////////////////////
  login(loginPayload: any): Observable<ApiResponse> {
    return this.doPost(this.tokenUrl + 'token/generate', loginPayload);
  }

  logout(id: string): Observable<ApiResponse> {
    return this.doGet(this.usersUrl + 'logout/' + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.doPost(this.usersUrl, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.doPut(this.usersUrl, user);
  }

  getUsers(): Observable<ApiResponse> {
    return this.doGet(this.usersUrl);
  }
  ////////////////////////////////////////////////////////////////
  //
  // ROLES
  //
  ////////////////////////////////////////////////////////////////
  getRoles(): Observable<ApiResponse> {
    return this.doGet(this.usersRolesUrl);
  }
  createRole(role: Role): Observable<ApiResponse> {
    return this.doPost(this.usersRolesUrl + 'add/', role);
  }
  updateRole(role: Role): Observable<ApiResponse> {
    return this.doPut(this.usersRolesUrl, role);
  }

  ////////////////////////////////////////////////////////////////
  //
  // DISCIPLINES
  //
  ////////////////////////////////////////////////////////////////
  getDisciplines(): Observable<ApiResponse> {
    return this.doGet(this.disciplinesUrl);
  }

  ////////////////////////////////////////////////////////////////
  //
  // COMMON METHODS
  //
  ////////////////////////////////////////////////////////////////
  private doGet(query: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(query);
  }
  private doPost(url: string, object: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(url, object);
  }
  private doPut(url: string, object: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(url, object);
  }
  private doDelete(url: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(url);
  }

  // deleteUser(id: number): Observable<ApiResponse> {
  //   return this.http.delete<ApiResponse>(this.usersUrl + id);
  // }


  // downloadCustomersCsv(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.customersUrl + 'ascsv/');
  // }
  // logError(error: Error)/*: Observable<ApiResponse>*/ {
  //   let resp = this.http.post<ApiResponse>(this.errorUrl, error);
  //   resp.subscribe(data => {
  //     if (data.message.startsWith('Http failure')) {
  //       alert('API IS DOWN');
  //       //clear local storage

  //     }
  //   });
  //   return resp;
  // }

  // login(loginPayload: { username: any; password: any; }): Observable<ApiResponse> {
  //   // try {
  //   return this.http.post<ApiResponse>(this.host + 'token/generate-token', loginPayload);

  //   // this.response = 
  //   // this.response
  //   //   .subscribe(data => {
  //   //     this.responseMessage = data.message;
  //   //   });
  //   // } catch (error) {

  //   // }

  //   //return this.response;
  // }
  // //###########################################################
  // //
  // // USERS
  // //
  // //###########################################################



  // getGroupOfUserLikeFirstName(firstName: string): Observable<ApiResponse> {
  //   return this.http.put<ApiResponse>(this.usersUrl + "likefirstname/", firstName);
  // }
  // unlockLockeThisUSer(id: number): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersUrl + 'unlock/' + id);
  // }



  // updateUser(user: User): Observable<ApiResponse> {
  //   if (user.password == 'unknown' || user.password == '') {
  //     user.password = null;
  //   }
  //   return this.http.put<ApiResponse>(this.usersUrl + user.id, user);
  // }

  // deleteUser(id: number): Observable<ApiResponse> {
  //   return this.http.delete<ApiResponse>(this.usersUrl + id);
  // }



  // syncUserLogout(id: number): Promise<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersUrl + 'logoutt/' + id).toPromise();
  // }




  // //###########################################################
  // //
  // // ROLES & MENUS
  // //
  // //###########################################################


  // getRoleById(id: number): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersRolesUrl + id);
  // }
  // getRoles(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersRolesUrl);
  // }



  // deleteRole(id: number) {
  //   return this.http.delete<ApiResponse>(this.usersRolesUrl + id);
  // }
  // /**
  //  * Get available menus
  //  */
  // getMenus(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersMenusUrl);
  // }

  // getMenusForRole(id: number): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersMenusUrl + id);
  // }



  // /**
  //  * 
  //  * @param images Upload images for given user
  //  * @param user 
  //  */
  // public uploadImage(images: File[], user: User): Observable<ApiResponse> {
  //   console.log(images);
  //   const formData = new FormData();
  //   if (images[0]) {
  //     formData.append('images', images[0], user.id + '_idcard.' + images[0].type.split('/')[1]);
  //   } else {
  //     formData.append('images', null);
  //   }
  //   if (images[1]) {
  //     formData.append('images', images[1], user.id + '_drlic.' + images[1].type.split('/')[1]);
  //   } else {
  //     formData.append('images', null);
  //   } 
  //   return this.http.post<ApiResponse>(this.usersUrl + 'uploadimg', formData);
  // }



  // // saveDeviceImages(images: File[], deviceId: number): Observable<ApiResponse> {
  // //   const formData = new FormData();
  // //   if (images[0]) {
  // //     formData.append('images', images[0], deviceId + '_one.' + images[0].type.split('/')[1]);
  // //   } else {
  // //     formData.append('images', null);
  // //   }
  // //   if (images[1]) {
  // //     formData.append('images', images[1], deviceId + '_two.' + images[1].type.split('/')[1]);
  // //   } else {
  // //     formData.append('images', null);
  // //   }
  // //   if (images[2]) {
  // //     formData.append('images', images[2], deviceId + '_three.' + images[2].type.split('/')[1]);
  // //   } else {
  // //     formData.append('images', null);
  // //   }
  // //   if (images[3]) {
  // //     formData.append('images', images[3], deviceId + '_four.' + images[3].type.split('/')[1]);
  // //   } else {
  // //     formData.append('images', null);
  // //   }
  // //   if (images[4]) {
  // //     formData.append('images', images[4], deviceId + '_five.' + images[4].type.split('/')[1]);
  // //   } else {
  // //     formData.append('images', null);
  // //   }
  // //   return this.http.post<ApiResponse>(this.ticketsUrl + 'devices/uploadimages/' + deviceId, formData);
  // // }



  // sendExcelToSpring(file: File, type: string): Observable<ApiResponse> {
  //   const formData = new FormData();

  //   try {

  //     switch (type) {
  //       case 'telenor':
  //         formData.append('excelFile', file, 'telenor_customers.' + file.type.split('/')[1]);
  //         break;
  //       case 'tikomi':
  //         formData.append('excelFile', file, 'tikomi_customers.' + file.type.split('/')[1]);
  //         break;
  //       case 'sim':

  //         formData.append('excelFile', file, 'sim.' + file.type.split('/')[1]);
  //         break;
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return this.http.post<ApiResponse>(this.customersUrl + 'uploadexcel', formData);

  // }


}