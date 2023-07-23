import { Injectable } from '@angular/core';

//Importing
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs'; //allows to receive the api response
import { environment } from 'src/environments/environment'; //where I have the API URL
import { ResponseApi } from '../Interfaces/response-api'; // allows us to receive our http response
import { Login } from '../Interfaces/login'; //credentials

@Injectable({
  providedIn: 'root'
})
export class UsertwoService {

  private urlApi: string = `${environment.endPoint}User/`;  //the user endpoint
  constructor(private http: HttpClient) { } //dependency injection of http client 


  //CRUD OPERATION methods
  Login(request: Login): Observable<ResponseApi> { //RESPONSEAPI is the response structure I declared

    return this.http.post<ResponseApi>(`${this.urlApi}Login`, request); //the final endpoint
  }
}
