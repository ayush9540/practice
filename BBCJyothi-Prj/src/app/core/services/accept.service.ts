import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { WipBins } from '../models/wip-bins';

@Injectable({
  providedIn: 'root'
})
export class AcceptService {

  private _url: string = "./acceptOK/";  
  
  constructor(private http: HttpClient) { }

  accept(caseId,elmObjid,attuid): Observable<WipBins[]>{
    let url=this._url;
    url+=caseId +"/";
    url+=attuid;
    url+='?wipBinObjidToAccept='+elmObjid;
    console.log(url);
    return this.http.get<WipBins[]>(url);
  } 

}
