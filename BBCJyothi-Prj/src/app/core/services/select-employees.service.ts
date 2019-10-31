import { Injectable } from '@angular/core';
import { SelectEmployees } from '../../core/models/select-employees';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectEmployeesService {


  private url1: string = "app/core/mocks/select-employee.json";
  private url2: string = "./findemployee/";

  constructor(private http: HttpClient) { }

  getSelectedEmployeeData(requestBody): Observable<any> {
    let url = this.url2;
    // return this.http.get<any>(this.url1);
    return this.http.post<any>(url, requestBody);
  }

}
