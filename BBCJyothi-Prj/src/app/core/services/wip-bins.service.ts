import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { WipBins } from '../models/wip-bins';
import { WipbinsCaseList } from '../models/wipbins-case-list';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class WipBinsService {

  constructor(private userInfoService: UserInfoService, private http: HttpClient) { }
  private wipBins: WipBins[] = [];
  private _url1: string = "./wipBinsList/";
  private _url2: string = "./casesInWipBin/";
  //private _url1: string = "app/core/mocks/wipbins.json";

  setLocalAllWipBinsList(wipbins) {
    this.wipBins = wipbins;
  }

  getLocalAllWipBinsList(): WipBins[] {
    return this.wipBins;
  }

  getMockAllWipBinList(): Observable<WipBins[]> {
    return this.http.get<WipBins[]>(this._url1);
  }
  async getWipBinsList(): Promise<WipBins[]> {
    let userObjid = this.userInfoService.getSesssionUserInfo().objid;
    let url = this._url1;
    url += userObjid;
    return await this.http.get<WipBins[]>(url).toPromise();
  }

  getCasesInWipBin(elmObjid): Observable<WipbinsCaseList[]> {
    let url = this._url2;
    url += elmObjid;
    return this.http.get<WipbinsCaseList[]>(url);
  }

  getWipBinsListBasedOnInputs(option, subOpt, sortOpt, qryInput): Observable<WipBins[]> {
    let userObjid = this.userInfoService.getSesssionUserInfo().objid;
    let url = this._url1;
    url += userObjid;
    url += "?option=" + option;
    url += "&subOpt=" + subOpt;
    url += "&sortOpt=" + sortOpt;
    url += "&qryInput=" + qryInput;
    return this.http.get<WipBins[]>(url);
  }

  getCasesInWipBinBasedOnInputs(wipObjid, option, subOpt, sortOpt, qryInput): Observable<any> {
    let url = this._url2;
    url += wipObjid;
    url += "?option=" + option;
    url += "&subOpt=" + subOpt;
    url += "&sortOpt=" + sortOpt;
    url += "&qryInput=" + qryInput;
    return this.http.get<any>(url);
  }

}
