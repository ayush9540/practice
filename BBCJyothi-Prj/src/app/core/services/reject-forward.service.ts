import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class RejectForwardService {

  private _url1: string = "./forwardOK/";
  private _url2: string = "./returnToSender/";

  constructor(private http: HttpClient) { }

  forward(caseId, queueToBeForward, userLoggedIn, reason): Observable<Response> {
    let url = this._url1;
    url += caseId;
    url += '?queueToBeForward=' + queueToBeForward;
    url += '&forwardMessage=' + reason;
    url += '&userLoggedIn=' + userLoggedIn;
    console.log(url);
    return this.http.get<Response>(url);
  }
  returnToSender(caseId, userLoggedIn, reason): Observable<Response> {
    let url = this._url2;
    url += caseId;
    url += '?userLoggedIn=' + userLoggedIn;
    url += '&rejectMessage=' + reason;
    console.log(url);
    return this.http.get<Response>(url);

  }
}
