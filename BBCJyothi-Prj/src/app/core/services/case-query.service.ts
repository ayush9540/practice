import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaseQueryService {

  private url = "app/core/mocks/caseQuery.json";
  private url1 = "./caseQueryList/";
  private url2 = "./removeQuery/";
  private url3 = "./markAsShared/";
  private url4 = "./markAsPersonal/";
  private url5 = "./renameCaseQuery/";
  private url6 = "./qryFilterValueList/";
  private url7 = "./modify/";
  private url8 = "./qryDetails/";
  private url9 = "app/core/mocks/newCaseQuery.json";
  private url10 = "./saveCaseQuery";
  private url11 = "./casesBasedOnQuery/";
  private url12 = "./casesBasedOnSelectedQueryElm/";

  constructor(private http: HttpClient) { }

  getCaseQueryList(userObjid): Observable<any> {
    let url = this.url1;
    url += userObjid;
    //return this.http.get<any>(this.url);
    return this.http.get<any>(url);
  }
  markPersonal(qryObjid): Observable<any> {
    let url = this.url4;
    url += qryObjid;
    return this.http.post<any>(url, null);
  }
  markShared(qryObjid): Observable<any> {
    let url = this.url3;
    url += qryObjid;
    return this.http.post<any>(url, null);
  }
  renameQuery(qryObjid, title): Observable<any> {
    let url = this.url5;
    url += qryObjid + "/";
    url += title;
    return this.http.post<any>(url, null);
  }
  removeQuery(qryObjid): Observable<any> {
    let url = this.url2;
    url += qryObjid;
    return this.http.delete<any>(url);
  }
  getFilteredValue(property): Observable<any> {
    let url = this.url6;
    url += '?property=' + property;
    return this.http.get<any>(url);
  }
  getModifyData(): Observable<any> {
    let url = this.url7;
    return this.http.get<any>(url);
  }

  getCaseQueryDetails(qryObjid): Observable<any> {
    let url = this.url8;
    url += qryObjid;
    //return this.http.get<any>(this.url9);
    return this.http.get<any>(url);
  }

  saveCaseQueryData(queryData): Observable<any> {
    let url = this.url10;
    return this.http.post<any>(url, queryData);
  }

  getCasesBasedOnQuery(qryObjid): Observable<any> {
    let url = this.url11;
    url += qryObjid;
    return this.http.get<any>(url);
  }

  casesBasedSelectedQueryElm(qryDetailsData): Observable<any> {
    let url = this.url12;
    return this.http.post<any>(url, qryDetailsData);
  }
}
