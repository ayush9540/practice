import { Injectable } from '@angular/core';
import { HsiaInfo } from '../../core/models/hsiaInfo';
import { Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HsiaInfoService {

  //private _url: string = "./hsiaInfo/{objid}";
  private _url: string = "";
  
  
  constructor(private http: HttpClient) { }

  getHsiaInfoData(caseObjId): Observable<HsiaInfo>{
    console.log(this._url + caseObjId);
    return this.http.get<HsiaInfo>(this._url + caseObjId);
  }

}
