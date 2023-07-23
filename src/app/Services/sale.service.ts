import { Injectable } from '@angular/core';
//Importing
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs'; //allows to receive the api response
import { environment } from 'src/environments/environment'; //where I have the API URL
import { ResponseApi } from '../Interfaces/response-api'; // allows us to receive our http response
import { Sale } from '../Interfaces/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  private urlApi: string = `${environment.endPoint}Sale/`;  //the user endpoint
  constructor(private http: HttpClient) { } //dependency injection of http client 

  //
  Create(request: Sale): Observable<ResponseApi> { //RESPONSEAPI is the response structure I declared

    return this.http.post<ResponseApi>(`${this.urlApi}Create`, request, { 'headers': this.headers }); //the final endpoint
  }

  History(searchBy: string, saleNumber: string, startDate: string, endDate: string): Observable<ResponseApi> { //RESPONSEAPI is the response structure I declared

    return this.http.get<ResponseApi>(`${this.urlApi}SaleHistory?searchBy=${searchBy}&saleNumber=${saleNumber}&startDate=${startDate}&endDate=${endDate}`, { 'headers': this.headers }); //the final endpoint
  }

  Report(startDate: string, endDate: string): Observable<ResponseApi> { //RESPONSEAPI is the response structure I declared

    return this.http.get<ResponseApi>(`${this.urlApi}Report?startDate=${startDate}&endDate=${endDate}`, { 'headers': this.headers }); //the final endpoint
  }
}
