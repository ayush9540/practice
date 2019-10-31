import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CaseSite } from '../../core/models/case-site';
import { CaseInfo } from '../models/case-info';


@Injectable({
  providedIn: 'root'
})
export class CaseSiteService {


  private _url1 = "app/core/mocks/case-site.json";
  private _url2 = "./siteinfo/";
  private _url3 = "./addsite/";
  private _url4 = "./replacesite/";
  private _url5 = "./timezoneInfo/";

  caseSite: CaseSite;
  selectedIndex: number;
  case: CaseInfo;

  constructor(private http: HttpClient) { }

  getCaseSiteData(): Observable<any> {
    return this.http.get<any>(this._url1);
  }

  getTimezoneInfo(siteObjid): Observable<any> {
    let url = this._url5;
    url += siteObjid;
    return this.http.get<any>(url);
  }

  getSelectedCaseSite(siteObjid): Observable<any> {
    //console.log(this.selectedIndex + ":" + this.caseContact);
    let url = this._url2;
    url += siteObjid;
    return this.http.get<any>(url);
    //return this.http.get<any>(this._url1);
  }


  addSiteInfoData(siteData): Observable<any> {
    let url = this._url3;
    return this.http.post<any>(url, siteData);
  }

  replaceSiteInfoData(siteData): Observable<any> {
    let url = this._url4;
    return this.http.put<any>(url, siteData);
  }

}




