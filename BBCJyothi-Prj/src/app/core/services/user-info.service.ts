
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { UserInfo } from '../models/user-info';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeRole } from '../models/employee-roles';

export class Employee {
  "id": string;
  "employee_name": string;
  "employee_salary": string;
  "employee_age": string;
  "profile_image": string;
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) { }

  public userInActive: number = 0;
  private userInfo: UserInfo;
  private employeeRole: any = {};
  public sessionTimeout: number = 60;

  private _url: string = "./userInfo";
  private _urlGetLoggedInUserRole = "./getuserrole/"

  setUserInfo(userInfo) {
    this.userInfo = userInfo;
    this.sessionTimeout = (userInfo.sessionTimeout == null) ? this.sessionTimeout : userInfo.sessionTimeout;
  }

  getEmployeeRole() {
    console.log("empRole object @ user-info- srvice.ts", this.employeeRole);
    return this.employeeRole;
  }

  setEmployeeRole(role) {
    this.employeeRole.dslLimited = false;
    if (role === 'System Administrator') {
      this.employeeRole.dslSystemAdmin = true;
    } else if (role === 'DSL - Administrator') {
      this.employeeRole.dslAdmin = true;
    }
    else if (role === 'DSL - Supervisor') {
      this.employeeRole.dslSupervisor = true;
    }
    else if (role === 'DSL - General') {
      this.employeeRole.dslGeneral = true;
    } else if (role === 'DSL - Billing') {
      this.employeeRole.dslBilling = true;
    } else {
      this.employeeRole.dslLimited = true;
    }

  }

  getSesssionUserInfo() {
    return this.userInfo;
  }
  //async false
  async testSample(): Promise<Employee> {
    return await this.http.get<Employee>('http://dummy.restapiexample.com/xyz').toPromise();
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http
      .get<UserInfo>(this._url)
      .pipe(catchError(this.handleError));;
  }

  private handleError(res: HttpErrorResponse) {
    return observableThrowError(res.error || 'Server error');
  }

  // getLoggedInUserRole(attuid: string) {
  //   console.log(`logged in user Attuid :: ${attuid}`);
  //   return this.http.get<any>(`${this._urlGetLoggedInUserRole}${attuid}`).subscribe( res =>{

  //     console.log(`response :: ${JSON.stringify(res)}`);
  //     console.log(`userRole :: ${res.role}`);
  //     this.setEmployeeRole(res.role);

  //   },error =>{
  //     console.error('error while fetch user role');
  //     this.setEmployeeRole("DSL - Limited");
  //   });


  // }
}
