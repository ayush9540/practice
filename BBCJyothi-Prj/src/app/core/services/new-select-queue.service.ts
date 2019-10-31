import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { NewSelectQueue } from '../models/new-select-queue';
import { QueueMember } from '../models/queue-member';
import { Response } from '../models/response';


@Injectable({
  providedIn: 'root'
})
export class NewSelectQueueService {

  private _url4: string = "app/core/mocks/select-queues.json";
  private _url1: string = "./allusers";
  private _url2: string = "./replaceoraddqueue";

  public newSelectQueue: NewSelectQueue[] = []

  private allQueuesMembers: QueueMember[];

  constructor(private http: HttpClient) { }

  getAllNewSelectQueue(): Observable<NewSelectQueue[]> {
    return this.http.get<NewSelectQueue[]>(this._url4);
  }

  getAllQueuesMembers() {
    let url = this._url1;
    //url += "&dummy=" + Math.random();
    if (this.allQueuesMembers == null) {
      this.http.get<any>(url).subscribe(data => {
        this.allQueuesMembers = data.allUsers;
        return this.allQueuesMembers;
      });
    } else {
      return this.allQueuesMembers;
    }
  }

  createQueue(queueData): Observable<Response> {
    let url = this._url2;
    //url += "&dummy=" + Math.random();
    return this.http.post<Response>(url, queueData);
  }
}


