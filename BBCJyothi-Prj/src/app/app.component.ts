import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { CaseInfoService } from './core/services/case-info.service';
import { UserInfoService } from './core/services/user-info.service';
import { CaseCompService } from './core/services/case-comp.service';
import { CaseCompItem } from './core/models/case-comp-item';
import { UserInfo } from './core/models/user-info';
import { Dialog } from './shared/util/dialog';
import { CaseHostComponent } from './modules/case/case-host/case-host.component';
import { YankCase } from './core/models/yank-case';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDrawer } from '@angular/material';
import { YankCreationDialogComponent } from '../app/modules/dialogs/yank-creation-dialog/yank-creation-dialog.component';
import { DispatchDialogComponent } from '../app/modules/dialogs/dispatch-dialog/dispatch-dialog.component';
import { MoveTaskComponent } from '../app/modules/dialogs/move-task/move-task.component';
import { AcceptComponent } from '../app/modules/dialogs/accept/accept.component';
import { AssignDialogComponent } from '../app/modules/dialogs/assign-dialog/assign-dialog.component';
import { RejectForwardDialogComponent } from '../app/modules/dialogs/reject-forward-dialog/reject-forward-dialog.component';
import { IpLetterAdminComponent } from '../app/modules/dialogs/ip-letter-admin/ip-letter-admin.component';
import { LogCommitmentComponent } from '../app/modules/dialogs/log-commitment/log-commitment.component';
import { ActiveWorkingCaseService } from './core/services/active-working-case.service';
import { SelectQueuesComponent } from '../app/modules/dialogs/select-queues/select-queues.component';
import { NewSelectQueuesComponent } from './modules/dialogs/new-select-queues/new-select-queues.component';
import { NewSelectQueueService } from './core/services/new-select-queue.service';
import { WipbinsComponent } from './modules/dialogs/wipbins/wipbins.component';
import { CloseTaskComponent } from './shared/components/close-task/close-task.component';
import { CaseActionService } from './core/services/case-action.service';
import { ConfirmDialogComponent } from './modules/dialogs/confirm-dialog/confirm-dialog.component';
import { SelectContactComponent } from './modules/dialogs/select-contact/select-contact.component';
import { SelectSiteComponent } from './modules/dialogs/select-site/select-site.component';
import { CreateNewCaseComponent } from './modules/dialogs/create-new-case/create-new-case.component';
import { LogPhoneNotesResearchComponent } from '../app/modules/dialogs/log-phone-notes-research/log-phone-notes-research.component';
import { CaseInfo } from './core/models/case-info';
import { CaseInfoComponent } from './modules/case/case-info/case-info.component';
import { ActivityStatusNoteComponent } from '../app/modules/dialogs/activity-status-note/activity-status-note.component';
import { SelectEmployeesComponent } from './modules/dialogs/select-employees/select-employees.component';
import { CaseQueryComponent } from './modules/dialogs/case-query/case-query.component';
import { EmpDetailComponent } from './modules/dialogs/emp-detail/emp-detail.component';
import { CaseContactComponent } from './modules/dialogs/case-contact/case-contact.component';
import { CaseSiteComponent } from './modules/dialogs/case-site/case-site.component';

@Component({
  selector: 'bbw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(CaseHostComponent) caseHost: CaseHostComponent;

  @Input() userInfo: UserInfo;



  title = 'BroadBand Workflow';
  caseIdList: string[] = [];
  caseId: string = "";
  basedOnYankResponse: boolean = false;
  dialogRef: MatDialogRef<YankCreationDialogComponent>;
  dialogRef1: MatDialogRef<IpLetterAdminComponent>;
  dialogRefQue: MatDialogRef<SelectQueuesComponent>;
  dialogRefWipbin: MatDialogRef<WipbinsComponent>;
  selectedCaseIndex: number = 0;//default
  selectCase: number;//default
  caseCompList: CaseCompItem[] = [];

  disableCaseSelectedForAction: boolean = true;
  assignButton: boolean = true;
  moveButton: boolean = true;
  dispatchButton: boolean = true;
  acceptButton: boolean = true;
  rejectForwardButton: boolean = true;
  changeStatusButton: boolean = true;
  logActionsButton: boolean = true;
  empRole: any;

  //For fields to enable and disable, there wont be any condition check for yank button as it always enables.
  caseYanked: boolean = false;
  isNewCase: boolean = false;

  YabkResponseMessage: YankCase;
  isLoading = true;

  constructor(private caseInfoService: CaseInfoService,
    private caseActionService: CaseActionService,
    private dialog: Dialog,
    private dialogBox: MatDialog,
    private newSelectQueueService: NewSelectQueueService,
    private caseCompService: CaseCompService,
    private userInfoService: UserInfoService,
    public yankDialog: MatDialog,
    public ipLetterDialog: MatDialog,
    public dispatchDialog: MatDialog,
    public moveTaskDialog: MatDialog,
    public acceptDialog: MatDialog,
    public assignDialog: MatDialog,
    public selectQueueDialog: MatDialog,
    public NewWipbins: MatDialog,
    public closeTask: MatDialog,
    public selectContact: MatDialog,
    public selectSite: MatDialog,
    public newCase: MatDialog,
    public selectEmployees: MatDialog,
    public rejectForwardDialog: MatDialog,
    public changeStatusDialog: MatDialog,
    public changeContactOrSiteDialog: MatDialog,
    public logCommit: MatDialog,
    public openLogDialog: MatDialog,
    public caseQuery: MatDialog,
    public contactDialog: MatDialog,
    public employeeDialog: MatDialog,
    public siteDialog: MatDialog,
    public accountDialog: MatDialog,
    public contractDialog: MatDialog,
    private activeWorkingCaseService: ActiveWorkingCaseService) {
    console.log('construct...');

  }

  ngAfterViewInit() {
    this.isLoading = false;
    console.log('after...');

  }

  getUserInfoFromHtml() {
    let object: any = document.getElementById('userInfo');
    console.log('userInfo' + object.value);
    this.userInfo = JSON.parse(object.value);
    console.log('userInfo' + this.userInfo);
    this.userInfoService.setUserInfo(this.userInfo);
  }

  ngOnInit() {

    //console.log('role visible'+this.userInfoService.getEmployeeRole().dslLimited);

    this.empRole = this.userInfoService.getEmployeeRole();
    console.log("empRole object at app.component.ts", this.empRole);


    //Load users data initially
    //this.getUserInfoFromHtml();
    this.newSelectQueueService.getAllQueuesMembers();
    //Intial Load Get user Info ,wipbins and queues data
    console.log('before...');
    // this.userInfoService.getUserInfo().subscribe(data => {
    //   this.userInfo = data;
    //   this.userInfoService.setUserInfo(this.userInfo);
    // });
    console.log('After...');
    //User data service call to get all data at one shot
    if (this.userInfo == null) {
      let dummy = 'Dummy';
      this.userInfo = {
        loginName: "dev_d_sa",
        wirelessEmail: dummy,
        user2pageClass: dummy,
        userAccessIndicator: dummy,
        sLoginName: dummy,
        agentId: dummy,
        status: dummy,
        equipId: dummy,
        csLic: dummy,
        csdeLic: dummy,
        cqLic: dummy,
        passwdChg: dummy,
        lastLogin: dummy,
        clfoLic: dummy,
        csLicType: dummy,
        cqLicType: dummy,
        csftsdeLic: dummy,
        webLogin: dummy,
        sWebLogin: dummy,
        submitterInd: dummy,
        userAccess2privclass: dummy,
        userDefault2wipbin: dummy,
        supvrDefault2monitor: dummy,
        user2rcConfig: dummy,
        user2srvr: dummy,
        sfaLic: dummy,
        univLic: dummy,
        dev: dummy,
        locale: dummy,
        nodeId: dummy,
        offline2privclass: dummy,
        csftsLic: dummy,
        cqftsLic: dummy,
        objid: "268525973",
        userAttuid: dummy,
        userRole: "System Administrator"
      }
      this.userInfoService.setUserInfo(this.userInfo);
    }
    this.caseCompList = this.caseCompService.getCaseCompList();
  }

  checkNumber(caseId) {
    var reg = new RegExp(/^\d+$/);
    return reg.test(caseId);
  }

  caseExist(caseId): boolean {
    if (this.caseIdList.length == 0) {
      return true;
    } else {
      return (this.caseIdList.indexOf(caseId) == -1);
    }
  }

  getCaseInfo(caseId) {

    console.log(caseId);
    if ((caseId == null || caseId.length < 1)) {
      this.dialog.openDialog('Please enter Case ID.');
      return;
    }

    // if (!this.checkNumber(caseId)) {
    //   this.dialog.openDialog('Invalid Case ID. Please enter valid Case ID.');
    //   return;
    // }

    if (!this.caseExist(caseId)) {
      this.dialog.openDialog('Case ID already opened. Please enter different Case ID.');
      return;
    }

    this.isLoading = true;
    let local = true;
    if (local && caseId.indexOf('Untitled') == -1) {
      let caseInfo;
      this.caseInfoService.getLocalCaseInfo().then(data => {
        caseInfo = data;
        caseInfo.isNew = this.isNewCase;
        this.caseInfoService.createCaseInfo(caseId, caseInfo);//for all components
        this.caseIdList.push(caseId);
        this.disableCaseSelectedForAction = false;
        this.selectCase = this.caseIdList.length;
        this.selectedCaseIndex = this.selectCase;
        this.isLoading = false;
      });
    } else if (caseId.indexOf('Untitled') != -1) {
      let caseInfo;
      caseInfo = {
        "isNew": true,
        "caseId": {},
        "caseOwner": {
          "loginName": this.userInfo.loginName
        },
        "tableCase": {
          "xcaseType": "Request For Service",
          "xcaseSubtype": "New",
          "xserviceIndicator": "DSL",
          "xorigin": "Please Specify",
          "caseOwner2user": null,
          "caseCurrq2queue": null,
        },
        "tableSite": {
          "premisesLocation": "Domestic",
          "xcustSubtype": "Regular Corporate"
        },
        "tableSof": {
          "salesOffer": "Please Specify"
        },
        "tableContact": {},
        "tableAddress": {},
        "tableQueue": {},
        "tableWipbin": {},
        "tableUser": {},
        "tableCondition": {},
        "tableGbstElm": {},
        "containerRef": {},
        "tableGbstElmPrty": {
          "title": "Please Specify"
        }
      };
      this.disableCaseSelectedForAction = false;
      this.selectCase = this.caseIdList.length;
      caseInfo.tableUser = this.userInfoService.getSesssionUserInfo();
      this.caseInfoService.createCaseInfo(caseId, caseInfo);//for all components
      this.caseIdList.push(caseId);
      this.selectedCaseIndex = this.selectCase;
      this.isLoading = false;
      this.desktopButtonsEnabling(caseInfo.tableCase);
    }
    else {
      //Write logic to validate the case and pass case info....
      //this.userInfoService.testSample().then(data => {
      this.caseInfoService.getCaseInfo(caseId).then(data => {

        if (data == null || data == undefined) {
          this.showMessage(caseId);
          return;
        }

        this.disableCaseSelectedForAction = false;
        this.caseIdList.push(caseId);//local to app component
        //select Manually newly created case
        this.selectCase = this.caseIdList.length;
        data.isNew = false;
        data.tableUser = this.userInfoService.getSesssionUserInfo();
        console.log(this.selectCase + "select case");
        this.caseInfoService.createCaseInfo(caseId, data);//for all components
        this.selectedCaseIndex = this.selectCase;
        //Check enabling and disabling buttons based on user action.
        this.desktopButtonsEnabling(data.tableCase);
        this.isLoading = false;
      },
        error => {
          this.showMessage(caseId);
        }
      );
    }
  }

  //need to wok on for individual buttons
  toggleDisableForActionButtons(casedata) {
    this.disableCaseSelectedForAction = false;
    this.desktopButtonsEnabling(casedata);
  }

  showMessage(caseId) {
    this.dialog.openDialog('Case ID (' + caseId + ') not found. Please enter valid case ID.');
    console.log("something went wrong.. open model");
    this.isLoading = false;
  }
  createCase() {
    //this.getCaseInfo('untitled');
  }

  openLogCommitment() {

    this.logCommit.open(LogCommitmentComponent, {
      width: "95%",
      height: "85%",
      maxWidth: "95vw",
      disableClose: true,
    }).afterClosed().subscribe(data => {

    });
    //this.caseHost.loadComponent(9);
  }

  openLog() {
    this.openLogDialog.open(LogPhoneNotesResearchComponent, {
      width: "95%",
      height: "85%",
      maxWidth: "95vw",
      disableClose: true,
    }).afterClosed().subscribe(action => {
      if (action == 'Yes') {
        //refresh case info 
        this.refreshCaseInfo();
      }
    });
  }

  disableReopenTask: boolean = true;
  disableCloseTask: boolean = true;

  setSelected(index) {
    console.log("selected index : " + index);
    this.selectedCaseIndex = index;
    this.caseInfoService.selectedIndex = index;
    this.selectCase = index;
    //set disable and enable parts based on case
    this.setButtonActions();
  }


  setButtonActions() {
    if (this.caseIdList.length < 1) {
      this.disableAll();
      return;
    }
    this.desktopButtonsEnabling(this.caseInfoService.getSelectedCaseInfo().tableCase);
    let caseInfo: CaseInfo = this.caseInfoService.getSelectedCaseInfo();
    if (caseInfo.tableCondition.title == 'Closed') {
      this.disableReopenTask = false;
      this.disableCloseTask = true;
    } else {
      this.disableReopenTask = true;
      this.disableCloseTask = false;
    }
  }

  removeCase(index) {

    let message = "Do you want to close the case without saving?";
    if (!this.caseYanked) {
      this.removeFromUI(index);
      return;
    }
    this.dialogBox.open(ConfirmDialogComponent, {
      width: "400px",
      data: message
    }).afterClosed().subscribe(action => {
      if (action == 'Yes') {
        this.removeFromUI(index);
      } else {
        console.log('return back...');
        return;
      }
    });

  }

  removeFromUI(index) {
    this.caseIdList.splice(index, 1);
    this.caseInfoService.removeCaseInfo(index);
    this.setButtonActions();
  }

  //complete screen refresh
  refreshCaseInfo() {
    this.isLoading = true;
    //1.remove that content
    //2.add the content in same index.
    let caseId = this.caseIdList[this.selectedCaseIndex];
    console.log('caseId:' + caseId);
    this.caseInfoService.getCaseInfo(caseId).then(data => {
      let caseInfo = data;
      //caseInfo.tableSite.siteId = this.selectedCaseIndex + 100;
      let caseViewRef = this.caseInfoService.getSelectedCaseInfo().containerRef;
      caseInfo.containerRef = caseViewRef;
      caseInfo.caseId = caseId;
      console.log('New case id created refreshing data...' + caseInfo.isNew);
      if (caseInfo.isNew == undefined || caseInfo.isNew == null || caseInfo.isNew) {
        console.log('New case id created refreshing data...');
        caseInfo.isNew = false;
      }
      caseInfo.tableUser = this.userInfoService.getSesssionUserInfo();
      this.caseInfoService.setCaseNewData(caseInfo);
      caseViewRef.loadCaseData();
      //this.caseInfoService.refreshCaseInfo(caseId, caseInfo);//for all components
      // this.caseIdList.splice(this.selectedCaseIndex, 1, caseId + 1);
      this.isLoading = false;
      //Check enabling and disabling buttons based on user action.
      this.desktopButtonsEnabling(caseInfo.tableCase);
    }, error => {
      this.isLoading = false;
    });
  }

  //will be called from child wipbins/queues
  caseAction(actionData) {
    console.log('Got info from queue/wipbin:' + actionData);
    let action = actionData.action;
    if (action == 'reject') {
      //we may get multiple caseid's
      this.openRejectForwardDialog();
    } else if (action == 'accept') {
      //we may get multiple caseid's
      this.openAcceptDialog();
    } else if (action == 'open') {
      let caseId = actionData.caseInfo.idNumber;
      this.getCaseInfo(caseId);
    } else if (action == 'dispatch') {
      //we may get multiple caseid's
      this.openDispatchDialog();
    }
  }

  /////Desktop Options START
  openAcceptDialog() {
    let actionData = this.getActionData(false);
    this.acceptDialog.open(AcceptComponent, {
      disableClose: true,
      data: actionData
    }).afterClosed().subscribe(data => {
      if (actionData.caseOpened) this.refreshCaseInfo();
    });
  }

  openDispatchDialog() {
    let actionData = this.getActionData(false);
    this.dispatchDialog.open(DispatchDialogComponent, {
      disableClose: true,
      data: actionData
    }).afterClosed().subscribe(data => {
      if (actionData.caseOpened) this.refreshCaseInfo();
    });
  }

  openMoveDialog() {
    ///Open move dialog to display wipbins list.
    let actionData = this.getActionData(false);
    this.moveTaskDialog.open(MoveTaskComponent, {
      disableClose: true,
      data: actionData
    }).afterClosed().subscribe(data => {
      if (actionData.caseOpened) this.refreshCaseInfo();
    });
  }
  openAssignDialog() {
    ///Open assign dialog to display wipbins list.
    let actionData = this.getActionData(false);
    this.assignDialog.open(AssignDialogComponent, {
      disableClose: true,
      data: actionData
    }).afterClosed().subscribe(data => {
      if (actionData.caseOpened) this.refreshCaseInfo();
    });
  }
  openRejectForwardDialog() {
    ///Open assign dialog to display wipbins list.
    let actionData = this.getActionData(false);
    this.rejectForwardDialog.open(RejectForwardDialogComponent, {
      width: "50%",
      height: "69%",
      disableClose: true,
      data: actionData
    }).afterClosed().subscribe(data => {
      if (actionData.caseOpened) this.refreshCaseInfo();
    });
  }

  openChangeStatusDialog() {
    this.changeStatusDialog.open(ActivityStatusNoteComponent, {
      width: "60%",
      maxWidth: "95vw",
      disableClose: true
    }).afterClosed().subscribe(action => {
      if (action == 'Yes') {
        this.refreshCaseInfo();
      } else {
        //Do nothing
        console.log('Do Nothing..')
      }
    });
  }
  openYankDialog() {
    let actionData = this.getActionData(true);
    this.yankDialog.open(YankCreationDialogComponent, {
      disableClose: true,
      data: (actionData == null) ? "" : actionData.caseId
    }).afterClosed().subscribe(result => {
      console.log('Refresh the page, case window and wipbin windows...etc');
      if (actionData.caseOpened) this.refreshCaseInfo();
    }
    );
  }
  openIpLetterAdministration() {
    this.dialogRef1 = this.ipLetterDialog.open(IpLetterAdminComponent, {
      width: "70%",
      height: "95%",
      disableClose: true,
    })
  }

  /////Desktop Options END

  @ViewChild('wipBinsSideNav') wipBinsSideNav: MatDrawer;
  toggleSideNav() {
    if (!this.wipBinsSideNav.opened) {
      this.activeWorkingCaseService.setSideNavOpen();
    } else {
      this.activeWorkingCaseService.setSideNavClose();
    }
    this.wipBinsSideNav.toggle();
  }

  getActionData(yank) {
    let caseInfo;
    if (this.wipBinsSideNav.opened) {
      caseInfo = this.activeWorkingCaseService.getActiveWorkingCaseInfo();
    } else {
      caseInfo = this.caseInfoService.getSelectedCaseInfo();
    }
    if (caseInfo == undefined || caseInfo == null) {
      if (!yank) this.dialog.openDialog('Please select Case ID.');
      return null;
    }
    let actionData: any = {};
    if (this.wipBinsSideNav.opened) {
      actionData.caseOpened = false;
      actionData.caseId = caseInfo.idNumber;
      actionData.title = caseInfo.title;
      actionData.wipBinTitle = "";
    } else {
      actionData.caseOpened = true;
      actionData.caseId = caseInfo.caseId;
      actionData.title = caseInfo.tableCase.title;
      actionData.wipBinTitle = caseInfo.tableWipbin.title;
    }
    return actionData;
  }

  //queueswipbinshost
  @ViewChild('queueswipbinshost') queueswipbinshost: any;

  openSelectQueues() {
    this.dialogRefQue = this.selectQueueDialog.open(SelectQueuesComponent, {
      width: "66%",
      disableClose: true,
      data: { 'event': this.queueswipbinshost }
    })
  }
  openSelectWipBins() {
    this.dialogRefWipbin = this.NewWipbins.open(WipbinsComponent, {
      width: "70%",
      disableClose: true,
      data: { 'event': this.queueswipbinshost }
    })
  }

  newQueue() {
    this.selectQueueDialog.open(NewSelectQueuesComponent, {
      width: '66%',
      disableClose: true,
      data: { 'event': this.queueswipbinshost, "action": 'New', "queueInfo": null }
    }).afterClosed().subscribe(data => {
      console.log('closed');
    });
  }

  closeTaskDialog() {
    this.closeTask.open(CloseTaskComponent, {
      width: "60%",
      // height:"450px",
      disableClose: true,
    }).afterClosed().subscribe(action => {
      if (action == 'Yes') {
        this.removeCase(this.selectedCaseIndex);
        this.setButtonActions();
      }
    });
  }

  reopenTask() {
    let message = 'Do you want to re-open case?';
    let caseId = this.caseInfoService.getSelectedCaseInfo().caseId;
    let attuid = this.userInfo.userAttuid;
    this.dialogBox.open(ConfirmDialogComponent, {
      width: "400px",
      data: message
    }).afterClosed().subscribe(action => {
      if (action == 'Yes') {
        this.caseActionService.sendReopenTask(caseId, attuid).subscribe(data => {
          this.dialog.openDialog(data.message);
          this.disableReopenTask = true;
          this.disableCloseTask = false;
          this.refreshCaseInfo();
        }, error => {
          console.log('error or something went wrong....');
        })
      }
    });
  }

  //Select contact screen from drop down
  selectContactDialog() {
    this.selectContact.open(SelectContactComponent, {
      width: "80%",
      // height:"450px",
      data: { 'fromSelect': true },
      disableClose: true,
    }).afterClosed().subscribe(data => {
      console.log('get the data....');
    })
  }

  selectSiteDialog() {
    this.selectSite.open(SelectSiteComponent, {
      width: "80%",
      height: "653px",
      disableClose: true,
    }).afterClosed().subscribe(data => {
      console.log('get the data....');
    });

  }

  newCaseSeq = 0;
  newCaseCreate() {
    this.getCaseInfo('Untitled' + this.newCaseSeq);
    this.newCaseSeq += 1;
    // const dialogRef = this.newCase.open(CreateNewCaseComponent,{

  }

  selectEmployeesDialog() {
    this.selectEmployees.open(SelectEmployeesComponent, {
      width: '80%',
      disableClose: true,
    })
  }

  saveSelectedCaseInfo() {
    // this.caseInfoService.getLocalCaseInfo().then(data => {
    //   let caseInfo = data;
    //   caseInfo.tableSite.siteId;
    // });
    //currently working case id info 
    let caseInfo: any = this.caseInfoService.getSelectedCaseInfo().containerRef.caseInfo;
    let originValue = caseInfo.tableCase.xorigin;

    let salesOfferValue = caseInfo.tableSof.salesOffer;

    let prioritySeverityValue = caseInfo.tableGbstElmPrty.title;

    let caseTitle = caseInfo.tableCase.title;

    if (originValue === 'Please Specify') {
      this.dialog.openDialog('Please specify Case Orgin');
      return;
    }
    if (salesOfferValue === 'Please Specify') {
      this.dialog.openDialog('Please specify a Sales Offer');
      return;

    }
    if (prioritySeverityValue === 'Please Specify') {
      this.dialog.openDialog('Please specify a Priority/ Severity');
      return;
    }
    if (caseTitle === null || typeof caseTitle === 'undefined' || caseTitle.length == 0) {
      this.dialog.openDialog('Please enter the Case Title');
      return;
    }
    console.log(`trigger save button API`);
    this.isLoading = true;

    if (caseInfo.tableCase != undefined && caseInfo.tableCase.objid != null && caseInfo.tableCase.objid != undefined && caseInfo.tableCase.objid != "") {
      console.log('preparing data for save button API');
      let macdCaseData = {
        'caseObjid': caseInfo.tableCase.objid,
        'caseTitle': caseInfo.tableCase.title,
        'caseSubType': caseInfo.tableCase.xcaseSubtype,
        'altPhoneNum': caseInfo.tableCase.altPhoneNum,
        'origin': caseInfo.tableCase.xorigin,
        'priorSev': prioritySeverityValue,
        'siteObjid': caseInfo.tableSite.objid,
        'contactObjid': caseInfo.tableContact.objid,
        'computerLocation': caseInfo.tableSite.computerLocation,
        'operatingSystem': caseInfo.tableSite.operatingSystem,
        'wiringAuth': caseInfo.tableSite.wiringAuth,
        'availableWiring': caseInfo.tableSite.availableWiring,
        'ceilingWiring': caseInfo.tableSite.ceilingWiring,
        'custInstallTime': caseInfo.tableSite.custInstallTime,
        'phoneCloset': caseInfo.tableSite.phoneCloset,
        'nidLocation': caseInfo.tableSite.nidLocation,
        'acceptLowerSpeed': caseInfo.tableSite.acceptLowerSpeed,
        'addrsObjid': caseInfo.tableAddress.objid,
        'dwellingType': caseInfo.tableAddress.dwellingType
      }

      this.caseInfoService.saveMacdCaseData(macdCaseData).subscribe(data => {
        this.isLoading = false;
        console.log('save done.' + data);
        this.dialog.openDialog('Case data saved successfully.');
      }, error => {
        console.log('Error while saving.');
        this.isLoading = false;
      });
      return;
    }

    let casedata = {
      'Computer_Location': caseInfo.tableSite.computerLocation === undefined ? "" : caseInfo.tableSite.computerLocation,
      'Primary_Operating_System': caseInfo.tableSite.operatingSystem === undefined ? "" : caseInfo.tableSite.operatingSystem,
      'Wiring_Authorized': caseInfo.tableSite.wiringAuth === undefined ? "" : caseInfo.tableSite.wiringAuth,
      'Wiring_Available': caseInfo.tableSite.availableWiring === undefined ? "" : caseInfo.tableSite.availableWiring,
      'Ceiling_Wiring': caseInfo.tableSite.ceilingWiring === undefined ? "" : caseInfo.tableSite.ceilingWiring,
      'Install_Time': caseInfo.tableSite.custInstallTime === undefined ? "" : caseInfo.tableSite.custInstallTime,
      'Phone_Closet': caseInfo.tableSite.phoneCloset === undefined ? "" : caseInfo.tableSite.phoneCloset,
      'NID_Location': caseInfo.tableSite.nidLocation === undefined ? "" : caseInfo.tableSite.nidLocation,
      'Accept_Lower_Speed': caseInfo.tableSite.acceptLowerSpeed === undefined ? "" : caseInfo.tableSite.acceptLowerSpeed,
      'Cust_Id': caseInfo.tableSite.siteId === undefined ? "" : caseInfo.tableSite.siteId,
      'Name': caseInfo.tableSite.name === undefined ? "" : caseInfo.tableSite.name,
      'Cust_Qualifier': caseInfo.tableSite.xcustSubtype === undefined ? "" : caseInfo.tableSite.xcustSubtype,
      'Cust_Premises': caseInfo.tableSite.premisesLocation === undefined ? "" : caseInfo.tableSite.premisesLocation,
      'First_Name': caseInfo.tableContact.firstName === undefined ? "" : caseInfo.tableContact.firstName,
      'Last_Name': caseInfo.tableContact.lastName === undefined ? "" : caseInfo.tableContact.lastName,
      'Main_Phone': caseInfo.tableContact.phone === undefined ? "" : caseInfo.tableContact.phone,
      'Email': caseInfo.tableContact.email === undefined ? "" : caseInfo.tableContact.email,
      'Type': caseInfo.tableCase.xcaseType === undefined ? "" : caseInfo.tableCase.xcaseType,
      'Sub_Type': caseInfo.tableCase.xcaseSubtype === undefined ? "" : caseInfo.tableCase.xcaseSubtype,
      'Case_Title': caseInfo.tableCase.title === undefined ? "" : caseInfo.tableCase.title,

      'Service_Indicator': caseInfo.tableCase.xserviceIndicator === undefined ? "" : caseInfo.tableCase.xserviceIndicator,
      'Origin': caseInfo.tableCase.xorigin === undefined ? "" : caseInfo.tableCase.xorigin,
      'Biller_ID': caseInfo.tableSof.billerCode === undefined ? "" : caseInfo.tableSof.billerCode,
      'Install _Contact_On_Site': caseInfo.tableSof.installContactOnSite === undefined ? "" : caseInfo.tableSof.installContactOnSite,
      'Sales_Offer': caseInfo.tableSof.salesOffer === undefined ? "" : caseInfo.tableSof.salesOffer,
      'Priority_Severity': caseInfo.tableGbstElmPrty.title === undefined ? "" : caseInfo.tableGbstElmPrty.title,
      'Dwelling_Type': caseInfo.tableAddress.dwellingType === undefined ? "" : caseInfo.tableAddress.dwellingType,
      'Login_Name': this.userInfoService.getSesssionUserInfo().loginName,
      'Role_Name': caseInfo.roleName
    };

    this.caseInfoService.copycase(casedata).subscribe(data => {
      this.isLoading = false;
      console.log(`data from backend:::${data}`);
      if (data != null && data.caseNumber != null) {
        console.log(`new case Id ::: ${data.caseNumber}`);
        this.caseIdList[this.selectedCaseIndex] = data.caseNumber;
        this.refreshCaseInfo();
      } else {
        this.dialog.openDialog('Case ID creation failed.Please try after sometime.');
      }
    }, error => {
      console.log(`error on save button click ${error}`);
    });

    //1.all validations before going to store data...
    //0.cover user story number 487212 
    //

    //2.send data to back end save api.
    //success get caseid from response
    // this.caseIdList[this.selectedCaseIndex] = '33333';
    //this.refreshCaseInfo();
  }

  enableSave() {
    this.isNewCase = true;
  }

  desktopButtonsEnabling(casedata) {
    let caseOwnerObjid = casedata.caseOwner2user;
    let userObjid = this.userInfo.objid;
    let currQueueObjid = casedata.caseCurrq2queue;
    let queuePresent: boolean = false;
    let ownerSame: boolean = false;
    this.caseYanked = false;
    this.caseInfoService.getSelectedCaseInfo().caseYanked = this.caseYanked;

    if (currQueueObjid != null && currQueueObjid != undefined && currQueueObjid != "") {
      queuePresent = true;
    }
    if (userObjid == caseOwnerObjid) {
      ownerSame = true;
    }

    //Condition check for Assign
    if (ownerSame) {
      this.assignButton = false;
    } else {
      this.assignButton = true;
    }

    //Condition check for Yank
    if (ownerSame && !queuePresent) {
      this.caseYanked = true;
      console.log('Yank flag set to :' + this.caseYanked + ':');
      //Set this caseYanked flag (case yanked or not) in caseInfo
      //for case id to share with all components
      this.caseInfoService.getSelectedCaseInfo().caseYanked = this.caseYanked;
    }

    if (queuePresent && ownerSame) {
      this.acceptButton = false;
      this.dispatchButton = true;
      this.moveButton = false;
      this.rejectForwardButton = false;
    } else if (queuePresent && !ownerSame) {
      this.acceptButton = false;
      this.dispatchButton = true;
      this.moveButton = true;
      this.rejectForwardButton = false;
    } else if (!queuePresent && ownerSame) {
      this.acceptButton = true;
      this.dispatchButton = false;
      this.moveButton = false;
      this.rejectForwardButton = true;
    } else {
      this.acceptButton = true;
      this.dispatchButton = true;
      this.moveButton = true;
      this.rejectForwardButton = true;
    }
    if (this.caseInfoService.getSelectedCaseInfo().caseId.indexOf('Untitled') < 0) {
      this.changeStatusButton = false;
      this.logActionsButton = false;
    }
  }

  disableAll() {
    this.acceptButton = true;
    this.dispatchButton = true;
    this.moveButton = true;
    this.rejectForwardButton = true;
    this.assignButton = true;
    this.isNewCase = false;
    this.disableReopenTask = true;
    this.disableCloseTask = true;
    this.caseYanked = false;
    this.changeStatusButton = true;
    this.logActionsButton = true;
  }

  openCaseQueryDialog() {
    this.caseQuery.open(CaseQueryComponent, {
      width: '50%',
      disableClose: true,
      data: { 'fromSelect': true, 'appCompRef': this }
    })
  }
  //Select new contact screen
  openNewContact() {
    this.contactDialog.open(CaseContactComponent, {
      width: '80%',
      disableClose: true,
      data: { 'isNew': true, 'action': 'New' }
    }).afterClosed().subscribe(data => {

    })
  }
  openNewSite() {
    this.siteDialog.open(CaseSiteComponent, {
      width: '80%',
      height: '800px',
      disableClose: true,
      data: { 'isNew': true, 'action': 'New' }
    }).afterClosed().subscribe(data => {

    })
  }

  openNewContract() {

  }
  openNewEmployee() {
    this.employeeDialog.open(EmpDetailComponent, {
      width: "80%",
      height: "470px",
      disableClose: true,
      data: { 'selectedIndex': -1, 'employeeData': [], 'isNew': true }
    }).afterClosed().subscribe(data => {

    })
  }
  openNewAccount() {

  }

  //Select contact screen from drop-down and change the contact/site details of case
  openChangeContactOrSiteDialog() {
    let caseInfo = this.caseInfoService.getSelectedCaseInfo();
    let fullName = caseInfo.tableContact.firstName + ' ' + caseInfo.tableContact.lastName;
    this.changeContactOrSiteDialog.open(SelectContactComponent, {
      width: '80%',
      data: { 'fromSelect': false, caseInfo: caseInfo, fullName: fullName }
    }).afterClosed().subscribe(data => {
      caseInfo.containerRef.setCaseDataFromContactDialog(data);
    });
  }
}

