import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserModel } from '../Model/dataModel';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private createApi = "https://dev.digisuvidhacentre.com/Profile/api/MockUser";
  private viewApi = "https://dev.digisuvidhacentre.com/Profile/api/MockUser";
  private usersDeleteApi = "https://dev.digisuvidhacentre.com/Profile/api/MockUser/Delete/{id}";
  private eachApi = "https://dev.digisuvidhacentre.com/Profile/api/MockUser/{id}";

  constructor(private http:HttpClient) { }
  
  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })

  }

  getUser(){
    return this.http.get("https://dev.digisuvidhacentre.com/Profile/api/MockUser");
  }

  addUser(user): Observable<UserModel>{
    console.log(user);
    return this.http.post<UserModel>(this.createApi + '/users/', JSON.stringify(user), this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }

  // addUser(user){
  //   console.log(user)
  //   return this.http.post("https://dev.digisuvidhacentre.com/Profile/api/MockUser",{"user":user})
  //   .subscribe(data => {
  //     console.log(data);
  //   });
  // }

  deleteUser(id){
    return this.http.delete<UserModel>(this.usersDeleteApi + '/users/' + id, this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }

  // deleteUser(id){
  //   console.log(id)
  //   return this.http.post("https://dev.digisuvidhacentre.com/Profile/api/MockUser/Delete/{id}", {"id":id})
  //   .subscribe(data=>{
  //     console.log(data);
  //   })
  // }

  singleUser(id): Observable<UserModel>{
    return this.http.get<UserModel>(this.eachApi + '/users/' + id)
    .pipe(catchError(this.errorHandler))
  }
  
  errorHandler(error) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;

    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }

    return throwError(errorMessage);

 }
}
