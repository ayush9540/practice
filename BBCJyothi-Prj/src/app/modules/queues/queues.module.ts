import { NgModule } from '@angular/core';
import { AngularModule } from '../../shared/modules/angular/angular.module';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { RestClientModule } from '../../shared/modules/rest-client/rest-client.module';
import { CdkModule } from '../../shared/modules/cdk/cdk.module';

import { QueuesHostComponent } from './queues-host/queues-host.component';

import { QueuesCaseListComponent } from './queues-case-list/queues-case-list.component';
import { WipbinCaseListComponent } from './wipbin-case-list/wipbin-case-list.component';
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
  QueuesHostComponent,
  QueuesCaseListComponent,
  WipbinCaseListComponent,
    
  ],
  entryComponents:[

  ],
  providers:[

  ],
  exports:[
    QueuesHostComponent,
  ]
})
export class QueuesModule { }
