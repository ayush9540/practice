import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, from, ObjectUnsubscribedError} from 'rxjs';
import { IpLetterAdmin } from '../models/ip-letter-admin';
import { IpLetterTemplate } from '../models/ip-letter-admin';

@Injectable({
  providedIn: 'root'
})
export class IpLetterAdminService {
  private _url: string='app/core/mocks/templateData.json';
  private _url2: string='app/core/mocks/template-content.json';

  //private _url2: string='./serviceInfo/';
  private _url3: string='./iplAdminVersionData';
  private _url4: string='./ipLetterTemplate/';
  private _url5: string='./sendMail/';

  //5: params = "iplRevision2employee"
  //6: params = "letterObjId"

  constructor(private http: HttpClient) { }

  
  getIpLetterAdminData():Observable<IpLetterAdmin[]>{
    console.log("welcome to Ip Letter Administration")
    let url = this._url3;
    //return this.http.get<IpLetterAdmin[]>(this._url);
    return this.http.get<IpLetterAdmin[]>(url);
  }

  getIpLetterTemplateData(objid,letterType){
    let url = this._url4;
    url += objid;
    url += '?letterType='+letterType;
    //return this.http.get<IpLetterTemplate>(this._url2);
    return this.http.get<IpLetterTemplate>(url);

  }

  deleteIpLetterAdminData(objid,letterObjId){
    let url = this._url4;
    url+=objid;
    url+='?letterObjId='+letterObjId;
    return this.http.delete(url);
  }

  saveIpLetterAdminData(objid,employeeObjid,content){
    let url = this._url4;
    url+=objid;
    url+='?iplRevision2employee='+employeeObjid;
    return this.http.post(url,content);
  }

  sendMail(ipMail){
    let url = this._url5;
    return this.http.post(url,ipMail);
  }
}

