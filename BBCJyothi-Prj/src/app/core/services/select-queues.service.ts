import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { SelectQueue } from '../models/select-queue';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class SelectQueuesService {

  private _url4: string = "app/core/mocks/select-queues.json";
  private _url1: string = "./allQueuesList";
  private _url2: string = "./deletequeue/";

  private selectQueue: SelectQueue[] = [];

  constructor(private http: HttpClient) { }

  getMockAllSelectQueues(): Observable<SelectQueue[]> {
    return this.http.get<SelectQueue[]>(this._url4);

  }

  getAllQueues(subOpt, qryInput, sortOpt): Observable<SelectQueue[]> {
    let url = this._url1;
    url += "?option=title";
    url += "&operator=" + subOpt;
    url += "&value=" + qryInput;
    url += "&sortOpt=" + sortOpt;
    return this.http.get<SelectQueue[]>(url);
  }

  deleteQueueInfo(queueObjid): Observable<Response> {
    let url = this._url2;
    url += queueObjid;
    return this.http.delete<Response>(url);
  }

}


