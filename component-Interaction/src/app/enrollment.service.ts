import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './form-tdf/user';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  _url = ''
  constructor(private _http: HttpClient) { }

  enroll (user: User){

  }
}
