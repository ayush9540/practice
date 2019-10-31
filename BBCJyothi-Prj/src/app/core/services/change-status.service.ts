import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeStatusService {
  private _url1: string = "./changeCaseStatus/";

  constructor(private http: HttpClient) { }

  changeStatus(statusChange): Observable<any> {
    let url = this._url1;
    return this.http.post<any>(url, statusChange);
  }
}
