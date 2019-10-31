import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { YankCase } from '../models/yank-case';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class YankService {
  private _url: string = "./yank/";

  constructor(private http: HttpClient) { }

  async yankCase(caseId, attuid): Promise<Response> {
    let url = this._url;
    url += caseId + "/";
    url += attuid;
    return await this.http.get<Response>(url).toPromise();
  }
}





