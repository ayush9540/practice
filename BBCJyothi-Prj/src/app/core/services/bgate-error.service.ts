import { Injectable } from '@angular/core';
import { BgateError } from '../../core/models/bgate-error';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class BgateErrorService {

  private _url: string = 'app/core/mocks/bgate-error.json';
  private _url2 = './bgateInfo/';
  private _url3 = './bgateInfo/clear/';
  private _url4 = './bgateInfo/resubmit/';

  constructor(private http: HttpClient) { }

  getBgateErrorMocks(): Observable<BgateError[]> {
    return this.http.get<BgateError[]>(this._url)
  }

  getBgateErrors(siteId, accessSeq, serviceType): Observable<BgateError[]> {
    let url = this._url2;
    url += siteId + '/';
    url += accessSeq + '/';
    url += serviceType;
    //return this.http.get<BgateError[]>(this._url);
    return this.http.get<BgateError[]>(url);
  }

  clearBgateErrors(siteId, accessSeq): Observable<Response> {
    let url = this._url3;
    url += siteId + '/';
    url += accessSeq + '/';
    return this.http.post<Response>(url, null);
  }

  resubmitBgateErrors(caseId, transType, siteId, accessSeq): Observable<Response> {
    let url = this._url4;
    url += caseId + '/';
    url += siteId + '/';
    url += accessSeq + '/';
    url += '?transactionType=' + transType;
    return this.http.post<Response>(url, null);
  }
}
