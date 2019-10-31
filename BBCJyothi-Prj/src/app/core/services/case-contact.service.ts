import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CaseContact } from '../../core/models/case-contact';
import { CaseInfo } from '../models/case-info';

@Injectable({
  providedIn: 'root'
})
export class CaseContactService {

  private _url1 = "app/core/mocks/case-contact.json";
  private _url2 = "./contactinfo/";
  private _url3 = "./addcontact/";
  private _url4 = "./replacecontact/";

  caseContact : CaseContact;
  selectedIndex: number;
  case: CaseInfo;

  
  constructor(private http: HttpClient) { }

  getContactOppMackData(): Observable<CaseContact> {
    return this.http.get<CaseContact>(this._url1);

  }

  getSelectedCaseContact(contactObjid): Observable<CaseContact> {
    //console.log(this.selectedIndex + ":" + this.caseContact);
    let url = this._url2;
    url += contactObjid;
    return this.http.get<CaseContact>(url);
    //return this.http.get<CaseContact>(this._url1);
  }
  addContactInfoData(contactData): Observable<any> {
    let url = this._url3;
    return this.http.post<any>(url, contactData);
  }

  replaceContactInfoData(contactData): Observable<any> {
    let url = this._url4;
    return this.http.put<any>(url, contactData);
  }
}
