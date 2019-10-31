import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WipBins } from '../models/wip-bins';

@Injectable({
  providedIn: 'root'
})
export class MoveTaskService {

  private _url: string = "./moveOK/";

  constructor(private http: HttpClient) { }

  move(caseId, elmObjid, attuid): Observable<WipBins[]> {
    let url = this._url;
    url += caseId;
    url += '?wipBinObjidToMove=' + elmObjid;
    console.log(url);
    return this.http.get<WipBins[]>(url);
  }


}
