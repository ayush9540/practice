import { Injectable } from '@angular/core';
import { SiidData } from '../../core/models/siid-data';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SiidService {

  private _url2: string='app/core/mocks/siid-data.json';
  
  constructor(private http : HttpClient) { }

  getSiidDataMocks():Observable<SiidData[]>{
    return this.http.get<SiidData[]>(this._url2)
  }
}
