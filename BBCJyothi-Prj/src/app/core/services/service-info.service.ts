import { Injectable } from '@angular/core';
import { ServiceInfo } from './../models/service-info';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceInfoService {

  private _url1: string = 'app/core/mocks/service-info.json';
  private _url2: string = './serviceInfo/';
  private _url3: string = "";
  private _url4: string = "./siidInfo/";
  private _url5: string = "./speedChange";
  private _url6: string = "./copyCaseForSuspend";
  private _url7: string = "/savecpeinfo";

  private selectedServiceInfo: ServiceInfo;

  setSelectedServiceInfo(selectedServiceInfo) {
    this.selectedServiceInfo = selectedServiceInfo;
  }

  getSIIDInfo(installedopts2axspoint): Observable<any> {
    let url = this._url4;
    url += installedopts2axspoint;
    return this.http.get<any>(url);
  }

  getSelectedServiceInfo(): ServiceInfo {
    return this.selectedServiceInfo;
  }

  constructor(private http: HttpClient) { }

  getServiceInfoData(caseId, siteId, sofId): Observable<any> {
    console.log('get ServiceInfoData...');
    let url = this._url2;
    url += caseId + '/';
    url += siteId + '/';
    url += sofId;
    //return this.http.get<ServiceInfo[]>(this._url1);
    return this.http.get<any>(url);
  }

  modifyService(): Observable<ServiceInfo[]> {
    return this.http.get<ServiceInfo[]>(this._url3);
  }

  copyCaseSpeedChange(speedChangeRequestData): Observable<any> {
    let url = this._url5;
    return this.http.post<any>(url, speedChangeRequestData);
  }

  copyCaseSuspend(suspendRequestData): Observable<any> {
    let url = this._url6;
    return this.http.post<any>(url, suspendRequestData);
  }

  saveCpeInfo(cpeInfo): Observable<any> {
    let url = this._url7;
    return this.http.post<any>(url, cpeInfo);
  }
}

