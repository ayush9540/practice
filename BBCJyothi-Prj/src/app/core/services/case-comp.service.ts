import { Injectable } from '@angular/core';

import { CaseCompItem } from '../models/case-comp-item';
import { ActivityLogComponent } from '../../modules/case/activity-log/activity-log.component';
import { MoreInfoComponent } from '../../modules/case/more-info/more-info.component';
import { CaseInfoComponent } from '../../modules/case/case-info/case-info.component';
import { BrassComponent } from '../../modules/case/brass/brass.component';
import { CommitmentLogComponent } from '../../modules/case/commitment-log/commitment-log.component';
import { HsiaInfoComponent } from '../../modules/case/hsia-info/hsia-info.component';
import { CommHistoryComponent } from '../../modules/case/comm-history/comm-history.component';
@Injectable({
  providedIn: 'root'
})
export class CaseCompService {

  constructor() { }

  getCaseCompList(){
    return [
      new CaseCompItem(CaseInfoComponent),
      new CaseCompItem(ActivityLogComponent),
      new CaseCompItem(MoreInfoComponent),
      new CaseCompItem(BrassComponent),
      new CaseCompItem(CommitmentLogComponent),
      new CaseCompItem(HsiaInfoComponent),
      new CaseCompItem(CommHistoryComponent),
    ]
  }
}
