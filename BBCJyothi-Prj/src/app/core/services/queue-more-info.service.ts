import { Injectable } from '@angular/core';
import { QueueMoreInfo } from '../models/queue-more-info';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueMoreInfoService {
  private _url2: string='app/core/mocks/members.json';
  private _url1: string='./queueinfo/';
  constructor(private http : HttpClient) { }

  getQueueMoreInfo(queueObjid):Observable<QueueMoreInfo>{
    let url = this._url1;
    url += queueObjid;
    //return this.http.get<QueueMoreInfo>(this._url2);
    return this.http.get<QueueMoreInfo>(url);
  }

  
}
