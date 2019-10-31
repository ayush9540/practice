import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Queues } from '../models/queues';
import { QueuesCaseList } from '../models/queues-case-list';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class QueuesService {

  constructor(private userInfoService: UserInfoService, private http: HttpClient) { }
  private _url: string = "";
  private _url1: string = "./myQueuesList/";
  private _url2: string = "./allQueuesList";
  private _url3: string = "./casesInQueue/";
  private url4: string = "app/core/mocks/queues.json";

  private queues: Queues[] = [];

  setLocalAllQueuesList(queues) {
    this.queues = queues;
  }

  getLocalAllQueuesList(): Queues[] {
    return this.queues;
  }

  getMockAllQueuesList(): Observable<Queues[]> {
    return this.http.get<Queues[]>(this.url4);
  }

  async getMyQueuesList(): Promise<Queues[]> {
    let userObjid = this.userInfoService.getSesssionUserInfo().objid;
    let url = this._url1;
    url += userObjid;
    return await this.http.get<Queues[]>(url).toPromise();
  }
  async getAllQueuesList(): Promise<Queues[]> {
    return await this.http.get<Queues[]>(this._url2).toPromise();
  }

  getCasesInQueue(elmObjid): Observable<QueuesCaseList[]> {
    let url = this._url3;
    url += elmObjid;
    return this.http.get<QueuesCaseList[]>(url);
  }

  getCasesInQueueWithFilter(queueObjid, option, subOpt, sortOpt, queryInput) {
    let url = this._url3;
    url += queueObjid;
    url += '?option=' + option + '&subOpt=' + subOpt + '&sortOpt=' + sortOpt + '&qryInput=' + queryInput;
    return this.http.get<QueuesCaseList[]>(url);
  }
}
