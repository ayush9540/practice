import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { NewAddress } from '../models/new-address';



@Injectable({
  providedIn: 'root'
})
export class NewAddressService {

  private _url1 = "app/core/mocks/select-address-details.json";
  private _url2 = "./addressinfo/";
  private _url3: string = "./addaddress/";
  private _url4: string = "./replaceaddress/";

  constructor(private http: HttpClient) { }


  getOpenAddressDetailData(selectAdsObjid): Observable<any> {
    let url = this._url2;
    url += selectAdsObjid;
    return this.http.get<any>(url);
    //return this.http.get<any>(this._url1);
  }

  createAddress(addressData): Observable<any> {
    let url = this._url3;
    return this.http.post<any>(url, addressData);
  }

  replaceAddress(addressData): Observable<any> {
    let url = this._url4;
    return this.http.put<any>(url, addressData);
  }


}






