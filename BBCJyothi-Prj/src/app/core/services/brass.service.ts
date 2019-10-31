import { SirResponse } from './../../shared/components/sir-creation-dialog/SirResponse';
import { Injectable } from '@angular/core';
import { BrassResponse } from './../models/brass';
import { FetchResponse } from './../models/fetch';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrassService {

  //private _url: string = "http://zlp41146.vci.att.com:31327/bbw/ordermgmtservice/v1/log/getActivityLog/";    
  private _url: string = "./activityLog/";
  private _cancelUrl: string = './cancelOrderRequest';
  private _fetchUrl: string = './fetchaction';
  private _updateAction: string = './updateaction';
  private _brassDisconnect: string = './disconnectBrass';
  private _brassErrors: string = './brasserrors/';
  private _actionrequest: string = './actionrequest';
  private brassErrors: string = 'app/core/mocks/brass-error.json';
  private brassErrorSave: string = "./updateBrassErrorStatus/";
  private _ipActionUrl: string = './ipaction'

  constructor(private http: HttpClient) { }

  getBrassResponseData(caseId): Observable<BrassResponse[]> {
    console.log(this._url + caseId);
    return this.http.get<BrassResponse[]>(this._url + caseId);
  }

  fetchAction(caseId, datareq): Observable<FetchResponse> {
    let url = this._fetchUrl;
    url += '/caseid/' + caseId;
    url += '/datareq/' + datareq;
    return this.http.get<FetchResponse>(url);
  }

  ipAction(caseId, action): Observable<any> {
    let url = this._ipActionUrl;
    url += '/caseid/' + caseId;
    url += '/action/' + action;
    return this.http.get<any>(url);
  }

  updateAction(caseId, datareq, newSpeed): Observable<FetchResponse> {
    let url = this._updateAction;
    url += '/caseid/' + caseId;
    url += '/datareq/' + datareq;
    url += '?newSpeed=' + newSpeed;
    return this.http.get<FetchResponse>(url);
  }

  prequal(caseId): Observable<any> {
    let url = this._actionrequest;
    const params = new HttpParams().set('caseId', caseId).set('actionType', 'prequal');
    return this.http.get<any>(url, { params });
  }

  resume(caseId): Observable<any> {
    let url = this._actionrequest;
    const params = new HttpParams().set('caseId', caseId).set('actionType', 'Resume');
    return this.http.get<any>(url, { params });
  }

  suspend(caseId): Observable<any> {
    let url = this._actionrequest;
    const params = new HttpParams().set('caseId', caseId).set('actionType', 'Suspend');
    return this.http.get<any>(url, { params });
  }

  disconnect(disconnectRequestData): Observable<any> {
    let url = this._brassDisconnect;
    return this.http.post<any>(url,disconnectRequestData);
  }

  cancelOder(caseId) {

    let url = this._actionrequest;
    const params = new HttpParams().set('caseId', caseId).set('actionType', 'Cancel');
    return this.http.get<any>(url, { params });
    //return this.http.get<SirResponse>(this._cancelUrl, { params });
    //.subscribe(data => {
    //   console.log(`response :: ${data}`);

    //   if (data.resultCode != String(200)) {
    //     console.log(`not able to cancel order, reason :: ${data.resultMessage}`);
    //   } else {
    //     console.log(`cancel order successfully`);
    //   }

    // }, error => {
    //   if (error instanceof HttpErrorResponse) {
    //     console.log(`status code against Sir creation request:::${error.status}`);
    //     //Backend returns unsuccessful response codes such as 404, 500 etc.				  
    //     console.error('Backend returned status code: ', error.status);
    //     console.error('Response body:', error.message);
    //   } else {
    //     //A client-side or network error occurred.	          
    //     console.error('An error occurred:', error.message);
    //   }
    // });
  }

  getBrassErrors(caseid): Observable<any> {
    let url = this._brassErrors;
    url += caseid;
    return this.http.get<any>(url);
    //return this.http.get<any>(this.brassErrors);
  }

  getBrassErrorSave(objid, status): Observable<any> {
    let url = this.brassErrorSave;
    url += objid + '/';
    url += status;
    return this.http.post<any>(url, null);
  }
}
