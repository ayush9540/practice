import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { SelectAddress } from '../../core/models/select-address';

@Injectable({
  providedIn: 'root'
})
export class SelectAddressService {

  private url: string = "app/core/mocks/select-address.json";
  private url2: string = "./findaddress/";

  constructor(public http: HttpClient) { }

  getSelectAddressData(requestBody): Observable<any> {
    let url = this.url2;
    return this.http.post(url, requestBody);
    //return this.http.post(this.url, requestBody);
  }
}
