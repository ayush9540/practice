import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Queues } from 'src/app/core/models/queues';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  private _url: string = "./dispatchOK/";

  constructor(private http: HttpClient) { }

  dispatch(caseId, queueObjId,attuid): Observable<Queues[]> {
    let url = this._url;
    url += caseId + "/";
    url += attuid;
    url += '?queueToBeDispatched=' + queueObjId;
    console.log(url);
    return this.http.get<Queues[]>(url);
  }

  dispatchListFilter(caseObjId, subOpt, sortOpt, queryInput) {
    let url = this._url;
    url += caseObjId;
    url += '?option=' + '&subOpt=' + subOpt + '&sortOpt=' + sortOpt + '&qryInput=' + queryInput;
    return this.http.get<Queues[]>(url);
  }
}
