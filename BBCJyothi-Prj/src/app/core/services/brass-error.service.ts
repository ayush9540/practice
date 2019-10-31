import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrassError } from '../../core/models/brass-error';



@Injectable({
  providedIn: 'root'
})
export class BrassErrorService {

  private _url1: string = "app/core/mocks/brass-error.json";
  constructor(private http: HttpClient) { }

  getBrassErrorData(): Observable<BrassError[]> {
    return this.http.get<BrassError[]>(this._url1);
  }


}
