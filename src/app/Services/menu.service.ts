import { Injectable } from '@angular/core';
//Importing
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs'; //allows to receive the api response
import { environment } from 'src/environments/environment'; //where I have the API URL
import { ResponseApi } from '../Interfaces/response-api'; // allows us to receive our http response

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private urlApi: string = `${environment.endPoint}Menu/`;  //the user endpoint
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) { } //dependency injection of http client 

  List(userId: number): Observable<ResponseApi> {

    return this.http.get<ResponseApi>(`${this.urlApi}List?idUser=${userId}`, { 'headers': this.headers }); //the final endpoint and sending the idUser in the URL
  }
}
