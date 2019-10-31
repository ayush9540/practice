import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EmpDetail } from '../models/emp-detail';
import { CaseInfo } from '../models/case-info';


@Injectable({
  providedIn: 'root'
})
export class EmpDetailService {

  private _url1 = "app/core/mocks/emp-details.json";
  private _url2 = "./employeeinfo/";
  private _url3 = "./addemployee/";
  private _url4 = "./replaceemployee/";

  constructor(private http: HttpClient) { }

  empDetail: EmpDetail;
  selectedIndex: number;
  case: CaseInfo;


  getCaseEmpDetailData(empdetailObjid): Observable<any> {
    let url = this._url2;
    url += empdetailObjid;
    return this.http.get<any>(url);
    //return this.http.get<any>(this._url1);
  }

  getSelectedEmpDetails(empdetailObjid): Observable<any> {
    let url = this._url2;
    url += empdetailObjid;
    return this.http.get<any>(url);
    // return this.http.get<any>(this._url1);
  }
  
  addEmployee(empData): Observable<any> {
    let url = this._url3;
    return this.http.post<any>(url, empData);
  }

  replaceEmployee(empData): Observable<any> {
    let url = this._url4;
    return this.http.put<any>(url, empData);
  }
}
