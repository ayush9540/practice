import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class CaseActionService {

  private _url1: string = "./reopentask/";
  private _url2: string = "./closetask/";

  constructor(private http: HttpClient) { }

  sendReopenTask(caseId, attuid): Observable<Response> {
    let url = this._url1;
    url += caseId + "/";
    url += attuid;
    return this.http.get<Response>(url);
  }
  
  sendCloseTask(attuid, closeTaskData): Observable<Response> {
    let url = this._url2;
    url += attuid;
    let data: any = {};
    data.closetask = closeTaskData;
    return this.http.post<Response>(url, data);
  }
}
