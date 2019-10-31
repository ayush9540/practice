import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WipBins } from '../models/wip-bins';
import { Assign } from '../models/assign';

@Injectable({
  providedIn: 'root'
})
export class AssignService {

  private _url1: string = "./employees/";
  private _url2: string = "app/core/mocks/assign.json";
  private _url3: string = "./assign/";

  constructor(private http: HttpClient) { }

  assignClick(caseId, userObjid, attuid): Observable<void> {
    let url = this._url3;
    url += caseId + "/";
    url += attuid;
    url += '?userToAssign=' + userObjid;
    console.log(url);
    return this.http.get<void>(url);
  }

  getAssignWithFilter(userObjid, option, subOpt, queryInput) {
    let url = this._url1;
    url += userObjid;
    url += '?option=' + option + '&subOpt=' + subOpt + '&qryInput=' + queryInput;
    return this.http.get<Assign[]>(url);
  }
}
