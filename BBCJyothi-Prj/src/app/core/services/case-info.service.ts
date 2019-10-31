import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CaseInfo } from '../models/case-info';
import { PreviousCase } from '../models/prevCase';

@Injectable({
  providedIn: 'root'
})
export class CaseInfoService {

  caseInfo: CaseInfo[] = [];
  case: CaseInfo;
  selectedIndex: number;

  private _url: string = "./caseInfo/";
  private _caseInfoMocksUrl = "app/core/mocks/case-info.json";
  private url2 = "./casedata/";
  private _url2: string = "app/core/mocks/prevCase.json";
  private _url3: string = "./prevcases/";
  private _url4: string = "./copycase"; // this is for copy case 
  private _url5: string = "app/core/mocks/copy-case.json"; // this is for local mock response
  private _url6: string = "./saveCaseData"; // this is for copy case 

  constructor(private http: HttpClient) { }

  casesLength() {
    return this.caseInfo != null ? this.caseInfo.length : 0;
  }

  getCaseData(caseId) {
    let url = this.url2;
    url += caseId;
    return this.http.get<any>(url);
  }

  async getLocalCaseInfo(): Promise<CaseInfo> {
    return await this.http.get<CaseInfo>(this._caseInfoMocksUrl).toPromise();
    //this.caseInfo.push(this.case);
    //return this.case;
  }
  async getCaseInfo(caseId): Promise<CaseInfo> {
    //return this.getLocalCaseInfo();
    return await this.http.get<CaseInfo>(this._url + caseId).toPromise();
    //this.caseInfo.push(this.case);
    //return this.case;
  }

  setContainerRef(containerRef) {
    this.caseInfo[this.selectedIndex].containerRef = containerRef;
  }

  setCaseNewData(caseInfo) {
    this.caseInfo[this.selectedIndex] = caseInfo;
  }

  getSelectedCaseInfo() {
    console.log(this.selectedIndex + ":" + this.caseInfo);
    return this.caseInfo[this.selectedIndex];
  }

  refreshCaseInfo(caseId, caseInfo: CaseInfo) {
    caseInfo.caseId = caseId;
    this.caseInfo.splice(this.selectedIndex, 1, caseInfo);
    console.log(this.caseInfo);
  }

  createCaseInfo(caseId, caseInfo: CaseInfo) {
    console.log("create case Info for " + caseId);
    caseInfo.caseId = caseId;
    this.caseInfo.push(caseInfo);
    this.selectedIndex = this.caseInfo.length - 1;//index so we need to decrease
  }

  removeCaseInfo(index) {
    console.log("removing selected index;" + this.selectedIndex);
    console.log("index;" + index);
    this.caseInfo.splice(index, 1);
  }

  getPrevCaseDetails(timeFrame, listBy, caseObjid, objid): Observable<PreviousCase[]> {
    let url = this._url3;
    url += caseObjid + "/";
    url += timeFrame + '/';
    url += listBy + "/";
    url += objid;
    //return this.http.get<PreviousCase[]>(this._url2);
    return this.http.get<PreviousCase[]>(url);
  }

  copycase(copyCaseRequestBody: any = {}): Observable<any> {
    console.log(`inside copy case :: request body${copyCaseRequestBody}`);
    return this.http.post<any>(this._url4, copyCaseRequestBody);
    //return this.http.get<any>(this._url5); // for local

  }

  saveMacdCaseData(macdCaseData): Observable<any> {
    console.log(`inside copy case :: request body${macdCaseData}`);
    let url = this._url6;
    return this.http.post<any>(url, macdCaseData);
  }
}
