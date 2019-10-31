import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './core/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* Shared OR common external and angular modules */
import { MaterialModule } from '../app/shared/modules/material/material.module';
import { CdkModule } from '../app/shared/modules/cdk/cdk.module';
import { RestClientModule } from './shared/modules/rest-client/rest-client.module';
import { AngularModule } from './shared/modules/angular/angular.module';

/* Application modules */
import { CaseModule } from './modules/case/case.module';
import { QueuesModule } from './modules/queues/queues.module';
import { ServicesModule } from './core/services/services.module';
import { WarningMessageDialogComponent } from './shared/components/warning-message-dialog/warning-message-dialog.component';
import { MoreInfoDialogComponent } from './shared/components/more-info-dialog/more-info-dialog.component';
import { YankCreationDialogComponent } from './modules/dialogs/yank-creation-dialog/yank-creation-dialog.component';
import { DispatchDialogComponent } from './modules/dialogs/dispatch-dialog/dispatch-dialog.component';
import { HsiaDialogComponent } from './modules/dialogs/hsia-dialog/hsia-dialog.component';
import { ConfirmDialogComponent } from './modules/dialogs/confirm-dialog/confirm-dialog.component';
import { SelectContactComponent } from './modules/dialogs/select-contact/select-contact.component';
import { MoveTaskComponent } from './modules/dialogs/move-task/move-task.component';
import { AcceptComponent } from './modules/dialogs/accept/accept.component';
import { CreateIpDialogComponent } from './modules/dialogs/create-ip-dialog/create-ip-dialog.component';
import { AssignDialogComponent } from './modules/dialogs/assign-dialog/assign-dialog.component';
import { RejectForwardDialogComponent } from './modules/dialogs/reject-forward-dialog/reject-forward-dialog.component';
import { IpLetterAdminComponent } from './modules/dialogs/ip-letter-admin/ip-letter-admin.component';
import { ViewIpComponent } from './modules/dialogs/view-ip/view-ip.component';
import { CommitmentLogComponent } from './modules/dialogs/commitment-log/commitment-log.component';
import { LogCommitmentComponent } from './modules/dialogs/log-commitment/log-commitment.component';
import { DateTimeDialogComponent } from './modules/dialogs/date-time-dialog/date-time-dialog.component';
import { SelectQueuesComponent } from './modules/dialogs/select-queues/select-queues.component';
import { NewSelectQueuesComponent } from './modules/dialogs/new-select-queues/new-select-queues.component';
import { QueueMoreInfoComponent } from './modules/dialogs/queue-more-info/queue-more-info.component';
import { WipbinsComponent } from './modules/dialogs/wipbins/wipbins.component';
import { NewWipbinComponent } from './modules/dialogs/new-wipbin/new-wipbin.component';
import { BrassErrorComponent } from './shared/components/brass-error/brass-error.component';
import { CloseTaskComponent } from './shared/components/close-task/close-task.component';
import { IndexComponent } from './index/index.component';
import { SelectSiteComponent } from './modules/dialogs/select-site/select-site.component';
import { CaseContactComponent } from './modules/dialogs/case-contact/case-contact.component';
import { CreateNewCaseComponent } from './modules/dialogs/create-new-case/create-new-case.component';
import { CaseSiteComponent } from './modules/dialogs/case-site/case-site.component';
import { PrevCaseComponent } from './modules/dialogs/prev-case/prev-case.component';
import { PipesModule } from './core/pipes/pipes.module';
import { LogPhoneNotesResearchComponent } from './modules/dialogs/log-phone-notes-research/log-phone-notes-research.component';
import { ActivityStatusNoteComponent } from './modules/dialogs/activity-status-note/activity-status-note.component';
import { SelectEmployeesComponent } from './modules/dialogs/select-employees/select-employees.component';
import { EmpDetailComponent } from './modules/dialogs/emp-detail/emp-detail.component';
import { CaseQueryComponent } from './modules/dialogs/case-query/case-query.component';
import { HttpInterceptorService } from './core/interceptors/http-interceptor.service';
import { NewCaseQueryComponent } from './modules/dialogs/new-case-query/new-case-query.component';
import { SelectAddressComponent } from './modules/dialogs/select-address/select-address.component';
import { NewAddressComponent } from './modules/dialogs/new-address/new-address.component';
import { CaseQueryFindCasesComponent } from './modules/dialogs/case-query-find-cases/case-query-find-cases.component';
import { ActivityAddInfoComponent } from './modules/dialogs/activity-add-info/activity-add-info.component';
import { ViewCpeComponent } from './modules/dialogs/view-cpe/view-cpe.component';
import { DraggableTableDirective } from './core/directives/draggable-table.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WarningMessageDialogComponent,
    MoreInfoDialogComponent,
    YankCreationDialogComponent,
    DispatchDialogComponent,
    HsiaDialogComponent,
    ConfirmDialogComponent,
    MoveTaskComponent,
    AcceptComponent,
    CreateIpDialogComponent,
    AssignDialogComponent,
    RejectForwardDialogComponent,
    SelectContactComponent,
    IpLetterAdminComponent,
    ViewIpComponent,
    CommitmentLogComponent,
    LogCommitmentComponent,
    DateTimeDialogComponent,
    SelectQueuesComponent,
    NewSelectQueuesComponent,
    QueueMoreInfoComponent,
    WipbinsComponent,
    NewWipbinComponent,
    BrassErrorComponent,
    CloseTaskComponent,
    IndexComponent,
    SelectSiteComponent,
    CaseContactComponent,
    CreateNewCaseComponent,
    CaseSiteComponent,
    PrevCaseComponent,
    LogPhoneNotesResearchComponent,
    ActivityStatusNoteComponent,
    SelectEmployeesComponent,
    EmpDetailComponent,
    CaseQueryComponent,
    NewCaseQueryComponent,
    SelectAddressComponent,
    NewAddressComponent,
    CaseQueryFindCasesComponent,
    ActivityAddInfoComponent,
    ViewCpeComponent,
    DraggableTableDirective,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularModule,
    MaterialModule,
    CdkModule,
    RestClientModule,
    CaseModule,
    QueuesModule,
    ServicesModule,
    PipesModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  entryComponents: [
    AppComponent,
    WarningMessageDialogComponent,
    MoreInfoDialogComponent,
    YankCreationDialogComponent,
    DispatchDialogComponent,
    HsiaDialogComponent,
    ConfirmDialogComponent,
    MoveTaskComponent,
    AcceptComponent,
    CreateIpDialogComponent,
    AssignDialogComponent,
    RejectForwardDialogComponent,
    SelectContactComponent,
    IpLetterAdminComponent,
    ViewIpComponent,
    LogCommitmentComponent,
    CommitmentLogComponent,
    DateTimeDialogComponent,
    SelectQueuesComponent,
    NewSelectQueuesComponent,
    QueueMoreInfoComponent,
    WipbinsComponent,
    NewWipbinComponent,
    BrassErrorComponent,
    CloseTaskComponent,
    SelectSiteComponent,
    CaseContactComponent,
    CreateNewCaseComponent,
    CaseSiteComponent,
    PrevCaseComponent,
    LogPhoneNotesResearchComponent,
    ActivityStatusNoteComponent,
    SelectEmployeesComponent,
    EmpDetailComponent,
    CaseQueryComponent,
    NewCaseQueryComponent,
    SelectAddressComponent,
    NewAddressComponent,
    CaseQueryFindCasesComponent,
    ActivityAddInfoComponent,
    ViewCpeComponent,
  ],
  bootstrap: [IndexComponent]
})
export class AppModule { }
