import { Injectable } from '@angular/core';
import { CaseInfo } from '../models/case-info';
import { QueuesCaseList } from '../models/queues-case-list';
import { CaseInfoService } from './case-info.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveWorkingCaseService {

  private queueCaseInfo: QueuesCaseList;
  private sideNav : boolean = false;

  constructor(
    private caseInfoService:CaseInfoService
  ) { }

  setSideNavOpen(){
    this.sideNav = true;
  }

  setSideNavClose(){
    this.sideNav = false;
  }

  setQueuesCaseList(queueCaseInfo) {
    this.sideNav = true;
    this.queueCaseInfo = queueCaseInfo;
  }

  getActiveWorkingCaseInfo():any{
      return this.queueCaseInfo;
  }

}
