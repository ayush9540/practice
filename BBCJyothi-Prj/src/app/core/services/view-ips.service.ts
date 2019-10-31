import { Injectable } from '@angular/core';
import { ViewIp } from '../../core/models/view-ip';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ViewIpsService {

  private _url2: string = 'app/core/mocks/viewIps.json';
  private _url1: string = './ipInfo/';

  constructor(private http: HttpClient) { }

  getViewIpsData(siteId): Observable<ViewIp[]> {
    let url = this._url1;
    url += siteId;
    //return this.http.get<ViewIp[]>(this._url2);;
    return this.http.get<ViewIp[]>(url);
  }

}
