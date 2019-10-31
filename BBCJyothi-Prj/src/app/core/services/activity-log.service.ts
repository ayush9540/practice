import { Injectable } from '@angular/core';
import { ActivityLog } from './../models/activity-log';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  private _url: string = "./activityLog/";
  private _url2: string = "app/core/mocks/activityLog.json";

  constructor(private http: HttpClient) { }

  getActivityLogData(caseObjId): Observable<ActivityLog[]> {
    let url = this._url;
    url += caseObjId;
    url += '/false';
    return this.http.get<ActivityLog[]>(url);
    //return this.http.get<ActivityLog[]>(this._url2);
  }

  getActivityLogWithFilter(caseObjId, option, subOpt, sortOpt, queryInput, siteTime) {
    let url = this._url;
    url += caseObjId;
    (siteTime) ? url += '/true' : url += '/false';
    url += '?option=' + option + '&subOpt=' + subOpt + '&sortOpt=' + sortOpt + '&qryInput=' + queryInput;
    return this.http.get<ActivityLog[]>(url);
  }
}
