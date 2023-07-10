import { Injectable } from '@angular/core';
//Importing
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs'; //allows to receive the api response
import { environment } from 'src/environments/environment'; //where I have the API URL
import { ResponseApi } from '../Interfaces/response-api'; // allows us to receive our http response
import { Product } from '../Interfaces/product'; //CRUD OPERATION that are declared in this interface

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private urlApi: string = `${environment.endPoint}Product/`;  //the user endpoint
  constructor(private http: HttpClient) { } //dependency injection of http client 

  //CRUD OPERATION methods
  List(): Observable<ResponseApi> {

    return this.http.get<ResponseApi>(`${this.urlApi}List`); //the final endpoint
  }

  Create(request: Product): Observable<ResponseApi> { //RESPONSEAPI is the response structure I declared

    return this.http.post<ResponseApi>(`${this.urlApi}Create`, request); //the final endpoint
  }

  Update(request: Product): Observable<ResponseApi> { //RESPONSEAPI is the response structure I declared

    return this.http.put<ResponseApi>(`${this.urlApi}UpdateProduct`, request); //the final endpoint
  }

  Delete(id: number): Observable<ResponseApi> { //RESPONSEAPI is the response structure I declared

    return this.http.delete<ResponseApi>(`${this.urlApi}DeleteProduct/${id}`); //the final endpoint
  }
}
