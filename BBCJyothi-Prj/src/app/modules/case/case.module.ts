import { NgModule } from '@angular/core';

import {ActivityLogComponent} from './activity-log/activity-log.component';
import { CaseHostComponent } from './case-host/case-host.component';
import { CaseCompManagerDirective } from '../../core/directives/case-comp-manager.directive';
import { MoreInfoComponent } from './more-info/more-info.component';
import { CaseInfoComponent } from './case-info/case-info.component';

/* Shared OR common external and angular modules */
import { MaterialModule } from '../../shared/modules/material/material.module';
import { AngularModule } from '../../shared/modules/angular/angular.module';
import { RestClientModule } from '../../shared/modules/rest-client/rest-client.module';
import { CdkModule } from '../../shared/modules/cdk/cdk.module';
import { BrassComponent } from './brass/brass.component';
import { CommitmentLogComponent } from './commitment-log/commitment-log.component';
import { HsiaInfoComponent } from './hsia-info/hsia-info.component';
import { CommHistoryComponent } from './comm-history/comm-history.component';
import {SirCreationDialogComponent} from '../../shared/components/sir-creation-dialog/sir-creation-dialog.component';
import { BgateErrorDialogComponent } from '../dialogs/bgate-error-dialog/bgate-error-dialog.component';
import { SiidDialogComponent } from '../dialogs/siid-dialog/siid-dialog.component';
import { BillingComponent } from '../case/billing/billing.component';
import { ServiceInfoComponent } from './service-info/service-info.component';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

@NgModule({
  imports: [
    MaterialModule,
    AngularModule,
    RestClientModule,
    CdkModule,
    PipesModule,
  ],
  declarations: [
    ActivityLogComponent,
    CaseHostComponent,
    CaseCompManagerDirective,
    MoreInfoComponent,
    CaseInfoComponent,
    BrassComponent,
    CommitmentLogComponent,
    HsiaInfoComponent,
    CommHistoryComponent,
    SirCreationDialogComponent,
    SiidDialogComponent,
    BgateErrorDialogComponent,
    BillingComponent,
    ServiceInfoComponent,

  ],
  entryComponents:[
    CaseInfoComponent,
    ActivityLogComponent,
    MoreInfoComponent,
    BrassComponent,
    CommitmentLogComponent,
    HsiaInfoComponent,
    SirCreationDialogComponent,
    SiidDialogComponent,
    BgateErrorDialogComponent,
    BillingComponent,
    ServiceInfoComponent,

  ],
  providers:[

  ],
  exports:[
    CaseHostComponent,
  ]
})
export class CaseModule { }
