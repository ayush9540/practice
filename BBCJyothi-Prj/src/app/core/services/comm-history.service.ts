import { Injectable } from '@angular/core';
import { CommHistory } from '../models/comm-history';;
import { Observable, of} from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommHistoryService {
  private _url: string = "./commitLog/";    
  
  constructor(private http: HttpClient) { }

  getCommHistoryData(objid): Observable<CommHistory[]>{
    let url = this._url;
    url += objid;
    url += '?readonly=';
    return this.http.get<CommHistory[]>(url);
  }
}
