import { Injectable } from '@angular/core';
import { SelectContact } from '../models/select-contact';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SelectContactService {
  private url: string = "app/core/mocks/select-contact.json"
  private url3: string = "./findcontact";

  constructor(public http: HttpClient) { }
  
  getSelectContact(requestBody:any={}): Observable<any> {
    return this.http.post<any>(this.url3,requestBody);
    //return this.http.post<any>(this.url,null);
    //return this.http.get<any>(this.url);// this is for local
  }

  getSelectContactWithFilter(contacts, subOptionValue, sortOptionValue) {
    let url = this.url3;
    url += contacts;
    url += '?subOptionValue=' + subOptionValue + 'sortOptionValue=' + sortOptionValue
    return this.http.get<any>(url);
  }
}
