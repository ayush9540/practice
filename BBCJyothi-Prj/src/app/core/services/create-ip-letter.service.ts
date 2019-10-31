import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateIpLetter } from '../models/createIpLetter';


@Injectable({
  providedIn: 'root'
})
export class CreateIpLetterService {

  private _url1: string = "./sendIpMail/";
  private _url2: string = "app/core/mocks/createIpMail.json";
  private _url3: string = "./ipMailData/";
  private _url4: string = './ipLetters/';

  constructor(private http: HttpClient) { }


  getListOfIpLetterType(selectedServiceInfo) {

    //if we need to get from back end make it true;
    let backendCall = false;

    let ipLetterType = [];
    ipLetterType.push('Please Specify');
    if (selectedServiceInfo == null || selectedServiceInfo == undefined) {
      return ipLetterType;
    }
    let offerProduct = selectedServiceInfo.offerProduct;
    let staticIpInd = selectedServiceInfo.staticIpInd;
    let dslProvider = selectedServiceInfo.dslProvider;

    if (backendCall) {
      let url = this._url4;
      url += offerProduct + "/";
      url += staticIpInd + "/";
      url += dslProvider;
      console.log(url);
      return this.http.get<any>(url);
    }

    switch (offerProduct) {
      case 'Single-User':
        if (staticIpInd == 'Yes') {
          if (dslProvider == 'SBC') {
            ipLetterType.push('cS Professional Install');
            ipLetterType.push('cS Self Install');
            ipLetterType.push('cS VISP Professional Install');
            ipLetterType.push('cS VISP Self Install');
            ipLetterType.push('cS IP Address change');
          } else if (dslProvider == 'BellSouth') {
            ipLetterType.push('SU Static IP Pro Install');
            ipLetterType.push('SU Static IP Self Install');
            ipLetterType.push('SU Network Config Static');
            ipLetterType.push('SU Network Config DHCP');
          } else if (dslProvider == 'HISA') {
            ipLetterType.push('HSIA Single User Dynamic');
            ipLetterType.push('HSIA Multiuser Static');
            ipLetterType.push('HSIA Activate IP');
            ipLetterType.push('FMO SU Static IP Self Install');
            ipLetterType.push('FMO Activate IP');
            ipLetterType.push('FMO Multi User Pro Install');
            ipLetterType.push('FMO Reserve IP');
            ipLetterType.push('FMO SU Pro Install');
            ipLetterType.push('FMO SU Self Install');
            ipLetterType.push('FMO SU Static IP Pro Install');
            ipLetterType.push('FMO SU Network Config DHCP');
            ipLetterType.push('FMO cS Professional Install');
            ipLetterType.push('FMO cS Self Install');
            ipLetterType.push('FMO cS IP Address Change');
            ipLetterType.push('FMO HSIA Multiuser Static');
            ipLetterType.push('FMO HSIA Single User Dynamic');
            ipLetterType.push('FMO HSIA Activate IP');
            ipLetterType.push('FMO Switch Letter');
          } else {
            ipLetterType.push('SU Static IP Pro Install');
            ipLetterType.push('SU Static IP Pro Install BYO');
            ipLetterType.push('SU Static IP Self Install');
            ipLetterType.push('SU Premium Self Install');
            ipLetterType.push('SU Network Config Static');
          }
        }
        if (staticIpInd == 'No') {
          if (dslProvider == 'SBC') {
            ipLetterType.push('cS Professional Install');
            ipLetterType.push('cS Self Install');
            ipLetterType.push('cS VISP Professional Install');
            ipLetterType.push('cS VISP Self Install');
            ipLetterType.push('cS IP Address change');
          } else if (dslProvider == 'BellSouth') {
            ipLetterType.push('SU Pro Install');
            ipLetterType.push('SU Self Install');
            ipLetterType.push('SU Network Config DHCP');
          } else if (dslProvider == 'HISA') {
            ipLetterType.push('HSIA Single User Dynamic');
            ipLetterType.push('HSIA Multiuser Static');
            ipLetterType.push('HSIA Activate IP');
            ipLetterType.push('FMO Activate IP');
            ipLetterType.push('FMO Multi User Pro Install');
            ipLetterType.push('FMO Reserve IP');
            ipLetterType.push('FMO SU Pro Install');
            ipLetterType.push('FMO SU Self Install');
            ipLetterType.push('FMO SU Static IP Pro Install');
            ipLetterType.push('FMO SU Network Config DHCP');
            ipLetterType.push('FMO cS Professional Install');
            ipLetterType.push('FMO cS Self Install');
            ipLetterType.push('FMO cS IP Address Change');
            ipLetterType.push('FMO HSIA Multiuser Static');
            ipLetterType.push('FMO HSIA Single User Dynamic');
            ipLetterType.push('FMO HSIA Activate IP');
            ipLetterType.push('FMO Switch Letter');
          } else {
            ipLetterType.push('SU Pro Install');
            ipLetterType.push('SU Self Install');
            ipLetterType.push('SU144K Pro Install');
            ipLetterType.push('SU144K Pro Install BYO CPE');
            ipLetterType.push('SU Network Config DHCP');
          }
        }
        break;
      case 'Multi-User':
        if (dslProvider == 'SBC') {
          ipLetterType.push('cS Professional Install');
          ipLetterType.push('cS Self Install');
          ipLetterType.push('cS VISP Professional Install');
          ipLetterType.push('cS VISP Self Install');
          ipLetterType.push('cS IP Address change');
        } else if (dslProvider == 'BellSouth') {
          ipLetterType.push('Activate IP');
          ipLetterType.push('Multi-User Pro Install - BellSouth');
          ipLetterType.push('Multi-User Self Install - BellSouth');
          ipLetterType.push('Pro Install BYO CPE - BellSouth');
          ipLetterType.push('Reserve IP');
        } else if (dslProvider == 'HISA') {
          ipLetterType.push('HSIA Single User Dynamic');
          ipLetterType.push('HSIA Multiuser Static');
          ipLetterType.push('HSIA Activate IP');
          ipLetterType.push('FMO Activate IP');
          ipLetterType.push('FMO Multi User Pro Install');
          ipLetterType.push('FMO Reserve IP');
          ipLetterType.push('FMO SU Pro Install');
          ipLetterType.push('FMO SU Self Install');
          ipLetterType.push('FMO SU Static IP Pro Install');
          ipLetterType.push('FMO SU Network Config DHCP');
          ipLetterType.push('FMO cS Professional Install');
          ipLetterType.push('FMO cS Self Install');
          ipLetterType.push('FMO cS IP Address Change');
          ipLetterType.push('FMO HSIA Multiuser Static');
          ipLetterType.push('FMO HSIA Single User Dynamic');
          ipLetterType.push('FMO HSIA Activate IP');
          ipLetterType.push('FMO Switch Letter');
        } else {
          ipLetterType.push('Activate IP');
          ipLetterType.push('Multi User Pro Install');
          ipLetterType.push('Pro Install BYO CPE');
          ipLetterType.push('Reserve IP');
        }
        break;
      default:
        ipLetterType.push('Activate IP');
        ipLetterType.push('Reserve IP');
        ipLetterType.push('SU Pro Install');
        ipLetterType.push('SU Self Install');
        ipLetterType.push('SU144K Pro Install');
        ipLetterType.push('SU144K Pro Install BYO CPE');
        ipLetterType.push('SU Network Config DHCP');
        ipLetterType.push('HSIA Single User Dynamic');
        ipLetterType.push('HSIA Multiuser Static');
        ipLetterType.push('HSIA Activate IP');
        break;
    }
    return ipLetterType;

  }

  getCreateMailData(loginname, caseId, letterType): Observable<CreateIpLetter> {
    let url = this._url3;
    url += loginname;
    url += '?caseId=' + caseId;
    url += '&letterType=' + letterType;
    console.log(url);
    return this.http.get<CreateIpLetter>(url);
  }

  sendMail(ipMail) {
    let url = this._url1;
    return this.http.post(url, ipMail);
  }
}
