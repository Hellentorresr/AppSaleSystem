import { Injectable } from '@angular/core';

//Importing
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs'; //allows to receive the api response
import { environment } from 'src/environments/environment'; //where I have the API URL
import { ResponseApi } from '../Interfaces/response-api'; // allows us to receive our http response
import { Login } from '../Interfaces/login'; //credentials
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlApi: string = `${environment.endPoint}User/`;  //the user endpoint
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {} //dependency injection of http client 

  //CRUD OPERATION methods

  List(): Observable<ResponseApi> {

    return this.http.get<ResponseApi>(`${this.urlApi}List`, { 'headers': this.headers }); //the final endpoint
  }

  Create(request: User): Observable<ResponseApi> { //RESPONSEAPI is the response structure I declared

    return this.http.post<ResponseApi>(`${this.urlApi}CreateUser`, request,{ 'headers': this.headers }); //the final endpoint
  }

  Update(request: User): Observable<ResponseApi> { //RESPONSEAPI is the response structure I declared

    return this.http.put<ResponseApi>(`${this.urlApi}UpdateUser`, request, { 'headers': this.headers }); //the final endpoint
  }

  Delete(id: number): Observable<ResponseApi> { //RESPONSEAPI is the response structure I declared

    return this.http.delete<ResponseApi>(`${this.urlApi}DeleteUser/${id}`, { 'headers': this.headers }); //the final endpoint
  }
}
