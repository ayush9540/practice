import { NgModule } from '@angular/core';
import { ActivityLogService } from './activity-log.service';
import { BrassService } from '../../core/services/brass.service';
import { CaseInfoService } from './case-info.service';
import { WipBinsService } from './wip-bins.service';
import { CaseCompService } from './case-comp.service';
import { UserInfoService } from './user-info.service';
import { QueuesService } from './queues.service';
import { YankService } from './yank.service';
import { SelectContactService } from './select-contact.service';
import { SelectCommitmentService } from './log-commitment.service';
import { ActiveWorkingCaseService } from './active-working-case.service';

@NgModule({
  providers:[
    ActivityLogService,
    CaseInfoService,
    WipBinsService,
    CaseCompService,
    BrassService,
    UserInfoService,
    QueuesService,
    YankService,
    SelectContactService,
    SelectCommitmentService,
    ActiveWorkingCaseService,
  ]
})
export class ServicesModule { }
