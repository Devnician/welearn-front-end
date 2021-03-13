
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from "rxjs/index";
import { environment } from '../../environments/environment';
import { ApiResponse } from "../model/api.response";

@Injectable()
 
export class ApiService {  
  host: string = environment.restUrl; 
  //Paths
  usersUrl: string = this.host + 'users/';
  errorUrl: string = this.host + 'support/err'
  usersRolesUrl: string = this.host + 'users/roles/';
  usersMenusUrl: string = this.host + 'users/menus/';
  usersPositionsUrl: string = this.host + 'users/positions'
  
  officesUrl: string = this.host + 'users/offices/';
  carsUrl: string = this.host + 'users/cars/';
  //Customers paths
  customersUrl: string = this.host + 'customers/';
 


  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {

  }
  private doGet(query: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(query);
  }
  // checkServer(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersUrl + 'ping/');
  // }
  // callTestMethod(): Observable<ApiResponse> {
  //   let res: Observable<ApiResponse> = this.http.get<ApiResponse>(this.customersUrl + 'test/');
  //   return res;
  // }
  // callTestMethod2(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.customersUrl + 'test2/');
  // }
  // callTestMethod3(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.customersUrl + 'test3/');
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

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.usersUrl);
  }
  // getUserByIdForEdit(id: number, lockedBy: number): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersUrl + id + '/' + lockedBy);
  // }
  // getGroupOfUserLikeFirstName(firstName: string): Observable<ApiResponse> {
  //   return this.http.put<ApiResponse>(this.usersUrl + "likefirstname/", firstName);
  // }
  // unlockLockeThisUSer(id: number): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersUrl + 'unlock/' + id);
  // }

  // /**
  //  * Add's new user 
  //  */
  // createUser(user: User): Observable<ApiResponse> {
  //   return this.http.post<ApiResponse>(this.usersUrl, user);
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

  // logoutUser(id: number): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersUrl + 'logout/' + id);
  // }

  // syncUserLogout(id: number): Promise<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersUrl + 'logoutt/' + id).toPromise();
  // }

  // getTechniciansForThisOffice(officeId: number): Observable<ApiResponse> {
  //   return this.http.put<ApiResponse>(this.usersUrl + "technicians/", officeId);
  // }

  // getAvailableTechniciansForThisOffice(officeId: number): Observable<ApiResponse> {
  //   return this.http.put<ApiResponse>(this.usersUrl + "avtechnicians/", officeId);
  // }
  // /**
  //  * Try to get car of this user
  //  */
  // getCarOfThisUser(carID: number): Observable<ApiResponse> {
  //   return this.http.put<ApiResponse>(this.usersUrl + "techincar/", carID);
  // }


  // //###########################################################
  // //
  // // ROLES & MENUS
  // //
  // //###########################################################
  // createRole(role: Role): Observable<ApiResponse> {
  //   return this.http.post<ApiResponse>(this.usersRolesUrl + 'add/', role);
  // }

  // getRoleById(id: number): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersRolesUrl + id);
  // }
  // getRoles(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersRolesUrl);
  // }

  // updateRole(role: Role): Observable<ApiResponse> {
  //   return this.http.put<ApiResponse>(this.usersRolesUrl + 'edit/' + role.id, role);
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


  // //###########################################################
  // //
  // // POSITIONS
  // //
  // //###########################################################
  // getPositions(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.usersPositionsUrl);
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

  

  // saveCarsImages(images: File[], carId: number): Observable<ApiResponse> {
  //   const formData = new FormData();

  //   if (images[0]) {
  //     formData.append('images', images[0], carId + '_front.' + images[0].type.split('/')[1]);
  //   } else {
  //     formData.append('images', null);
  //   }
  //   if (images[1]) {
  //     formData.append('images', images[1], carId + '_back.' + images[1].type.split('/')[1]);
  //   } else {
  //     formData.append('images', null);
  //   }
  //   if (images[2]) {
  //     formData.append('images', images[2], carId + '_side.' + images[2].type.split('/')[1]);
  //   } else {
  //     formData.append('images', null);
  //   }
  //   if (images[3]) {
  //     formData.append('images', images[3], carId + '_reg_card.' + images[3].type.split('/')[1]);
  //   } else {
  //     formData.append('images', null);
  //   }

  //   return this.http.post<ApiResponse>(this.carsUrl + 'uploadimages/' + carId, formData);
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