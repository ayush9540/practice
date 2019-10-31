import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
// import { SelectCommitment } from '../../core/models/SelectCommitment';
import { SelectCommitmentData } from '../models/select-commitment-data';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class SelectCommitmentService {

  private _url1: string = "app/core/mocks/selectCommitment.json";
  private _url2: string = "./commitLog/";
  private _url3: string = "./commitment/delete/";
  private _url4: string = "./commitment/reset/";
  private _url5: string = "./commitment/fullfill/";
  private _url = this._url2;
  private _url6: string = "./triggerTestAndTurnUpTransaction"; // this for Test and Turn Up
  private _url7: string = "./commitment/new/";//make

  constructor(private userInfoService: UserInfoService, private http: HttpClient) { }

  getSelectCommitmentData(objid): Observable<SelectCommitmentData> {
    let url = this._url;
    url += objid;
    return this.http.get<SelectCommitmentData>(url);
    //return this.http.get<SelectCommitmentData>(this._url1);
  }

  getSelectCommitmentWithFilter(caseObjId, option, subOpt, sortOpt, queryInput) {
    let url = this._url;
    url += caseObjId;
    url += '?option=' + option + '&subOpt=' + subOpt + '&sortOpt=' + sortOpt + '&qryInput=' + queryInput;
    // return this.http.get<SelectCommitment[]>(url);
  }

  deleteRecord(caseId, title, commitObjid): Observable<any> {
    let userObjid = this.userInfoService.getSesssionUserInfo().objid;
    let loginname = this.userInfoService.getSesssionUserInfo().loginName;
    let url = this._url3;
    url += caseId + "/";
    url += userObjid;
    url += "?title=" + title;
    url += "&commitObjid=" + commitObjid;
    url += "&loginname=" + loginname;
    return this.http.post(url, null);
  }

  resetRecord(caseId, title, commitObjid): Observable<any> {
    let userObjid = this.userInfoService.getSesssionUserInfo().objid;
    let loginname = this.userInfoService.getSesssionUserInfo().loginName;
    let url = this._url4;
    url += caseId + "/";
    url += userObjid;
    url += "?title=" + title;
    url += "&commitObjid=" + commitObjid;
    url += "&commitObjid=" + commitObjid;
    url += "&loginname=" + loginname;
    return this.http.post(url, null);
  }

  fullFillDateRecord(caseId, title, commitObjid, fullFillDate): Observable<any> {
    let userObjid = this.userInfoService.getSesssionUserInfo().objid;
    let loginname = this.userInfoService.getSesssionUserInfo().loginName;
    let url = this._url5;
    url += caseId + "/";
    url += userObjid;
    url += "?title=" + title;
    url += "&commitObjid=" + commitObjid;
    url += "&fullFillDate=" + fullFillDate;
    url += "&loginname=" + loginname;
    return this.http.post(url, null);
  }

  fullfillTransactionFromCommitment(caseId, caseObjid, userObjid, selectedAct, loginName, firstName, lastName, tableContactObjid): Observable<any> {
    let url = this._url5;
    url += caseId + "/";
    url += caseObjid + "/";
    url += userObjid + "/";
    url += tableContactObjid;
    url += "?loginName=" + loginName;
    url += "&firstName=" + firstName;
    url += "&lastName=" + lastName;
    return this.http.post(url, selectedAct);
  }

  makeCommitment(caseId, caseObjid, userObjid, selectedAct, loginName, firstName, lastName, tableContactObjid): Observable<any> {
    let url = this._url7;
    url += caseId + "/";
    url += caseObjid + "/";
    url += userObjid + "/";
    url += tableContactObjid;
    url += "?loginName=" + loginName;
    url += "&firstName=" + firstName;
    url += "&lastName=" + lastName;
    return this.http.post(url, selectedAct);
  }

}
