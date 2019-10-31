import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Logs } from '../../../app/core/models/logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private _url1: string = "./log/phonelog";
  private _url2: string = "./log/research";
  private _url3: string = "./log/notes";
  private _url4: string = "./phoneinitialresponse";

  constructor(private http: HttpClient) { }

  hangUp(researchLog): Observable<any> {
    let url = this._url1;
    return this.http.post<any>(url, researchLog);
  }

  logResearch(researchLog): Observable<any> {
    let url = this._url2;
    return this.http.post<any>(url, researchLog);
  }

  logNotes(researchLog): Observable<any> {
    let url = this._url3;
    return this.http.post<any>(url, researchLog);
  }

  initialResponse(researchLog): Observable<any> {
    let url = this._url4;
    return this.http.post<any>(url, researchLog);
  }

}
