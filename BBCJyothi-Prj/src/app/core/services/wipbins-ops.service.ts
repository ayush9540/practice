import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { HttpClient } from '@angular/common/http';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class WipbinsOpsService {

  private url1 = "./addwipbins/";
  private url2 = "./modifywipbins";
  private url3 = "./deletewipbins";

  constructor(private userInfoService: UserInfoService, private http: HttpClient) { }

  addWipbin(wipBin): Observable<Response> {
    let userObjid = this.userInfoService.getSesssionUserInfo().objid;
    let url = this.url1;
    url += userObjid;
    return this.http.post<Response>(url, wipBin);
  }
  modifyWipbin(wipBin): Observable<Response> {
    let url = this.url2;
    return this.http.post<Response>(url, wipBin);
  }

  deleteWipbin(wipBin): Observable<Response> {
    let defaultWipbin = this.userInfoService.getSesssionUserInfo().userDefault2wipbin;
    let url = this.url3;
    url += "?defaultWipbin=" + defaultWipbin;
    return this.http.post<Response>(url, wipBin);
  }
}
