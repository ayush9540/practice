import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Billing } from '../models/billing';
import { Observable } from 'rxjs';
import { Response } from './../models/response';
import { CustomerAccount } from '../models/customer-account';

@Injectable({
  providedIn: 'root'
})
export class BillingService {


  private _url: string = "./caseInfo/";
  private _url2 = "app/core/mocks/billing.json";
  private _url3: string = './custAccountData/';
  private _url4: string = './siidInfo/update/';
  private _url5: string = './billingdatatoipgw/';
  private _url6: string = './disconnectBilling/';

  moreInfoDetails: any
  constructor(private http: HttpClient) { }

  getBillingMocks(): Observable<Billing[]> {
    return this.http.get<Billing[]>(this._url2);
  }

  getCustomerAccountData(servicePoint2customerAccount): Observable<CustomerAccount> {
    let url = this._url3;
    url += servicePoint2customerAccount;
    return this.http.get<CustomerAccount>(url);
  }

  replaceSiid(selectedRec): Observable<Response> {
    let url = this._url4;
    url += selectedRec.objid;
    url += "?status=" + selectedRec.status;
    url += "&productPkg=" + selectedRec.productPkg;
    url += "&emfCode=" + selectedRec.emfCode;
    url += "&pppDescription=" + selectedRec.pppDescription;
    return this.http.post<Response>(url, null);
  }

  billingDataToIpgw(caseId, transType): Observable<any> {
    let url = this._url5;
    url += caseId;
    url += "?transactionType=" + transType;
    return this.http.post<any>(url, null);
  }

  disconnectBilling(disconnectBillingRequestData): Observable<any> {
    let url = this._url6;
    return this.http.post<any>(url, disconnectBillingRequestData);
  }
}

