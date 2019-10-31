import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { SelectSite } from '../models/select-site';


@Injectable({
  providedIn: 'root'
})
export class SelectSiteService {

  private _url1: string = "app/core/mocks/select-site.json";
  private url3: string = "./findsite";

  constructor(private http: HttpClient) { }

  getSelectSiteData(requestBody: any = {}): Observable<any> {
    return this.http.get<any>(this._url1);
  }

  getSelectContactWithFilter(requestBody) {
    let url = this.url3;
    return this.http.post<any>(url, requestBody);
    //return this.http.get<any>(this._url1)
  }
}

