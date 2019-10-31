import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Logs } from '../../../core/models/logs';
import { LogsService } from '../../../core/services/logs.service';
import { CaseInfoService } from '../../../core/services/case-info.service';
import { CaseInfo } from 'src/app/core/models/case-info';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { UserInfo } from 'src/app/core/models/user-info';
import { DateTimeDialogComponent } from '../../dialogs/date-time-dialog/date-time-dialog.component';
import { LogCommitmentComponent } from '../../dialogs/log-commitment/log-commitment.component';
import { CdtDateTimeService } from 'src/app/core/services/cdt-date-time.service';


@Component({
  selector: 'bbw-log-phone-notes-research',
  templateUrl: './log-phone-notes-research.component.html',
  styleUrls: ['./log-phone-notes-research.component.css']
})
export class LogPhoneNotesResearchComponent implements OnInit, AfterViewInit {

  logs: Logs[];
  caseInfo: CaseInfo;

  public month: any = "";
  public date: any = "";
  public year: any = "";
  public hours: any = "";
  public minutes: any = "";
  public seconds: any = "";

  constructor(
    public dialogRef: MatDialogRef<LogPhoneNotesResearchComponent>,
    public fullFillDate: MatDialog,
    public openCommitment: MatDialog,
    private logsService: LogsService,
    private caseInfoService: CaseInfoService,
    private cdtDateTimeService: CdtDateTimeService,
    private userInfoService: UserInfoService) {
  }

  actions = [];

  logNoteActions = ["Engineering review", "Manager review"];
  logResearchActions = ["Data Upate(s)", "Administrative", 'Data Review/Validate', 'Engineering research'];
  logPhoneActions = ["Incoming call", "Outgoing call"];

  commitments = ["Call back required", "Mail literature", "Send software update"];
  caseStatusTypes = ["Solving", "Approved", "Active", "Awaiting Prepayment", "Cancelled", "Cancel Pending", "Cleared", "Solving",
    "Credit Denied", "Credit Denied Hold", "Closed", "Data Modified", "Declined", "DNS Complete", "Disconnected", "In Progress",
    "LC Reffered Out", "MTS Cleared", "MTS Major Failure", "MTS On-Hold", "MTS Ref'd ATM N", "MTS Ref'd CBBNQ", "MTS Ref'd Cisco",
    "MTS Ref'd Easyline", "MTS Ref'd Frame", "MTS Ref'd INCST", "MTS Ref'd GCSC", "MTS Ref'd IPT", "MTS Ref'd Lucent", "MTS Ref'd NCR",
    "MTS Ref'd Netera", "MTS Ref'd Sonet", "MTS Ref'd T3 Grp", "MTS Ref'd to certify", "MTS Ref'd to HSP", "MTS Ref'd RMC", "MTS Ref'd Voice",
    "MTS Returned", "MTS Solving", "New", "On-Hold", "Pending Acknowledgement", "Pending Approval", "Pending Confoirmation", "Pending DNS",
    "Pending SSL Cert", "Pending Verification", "Pre Payment Pending", "Reffered Out", "Reffered to RFS", "Rejected", "Returned", "Status Update 2",
    "Status Update 3", "Status Update 4", "Suspended", "System Error", "To Be Suspended", "To Be Disconnected", "Verified", "WSS Cleared",
    "WSS Completed", "WSS DNS Setup", "WSS Kit Shipped", "WSS Letter Printer", "WSS Out Of Stock", "WSS Pending BDS", "Attach DSL Planner"];

  researchLog: any = {};
  userInfo: UserInfo;
  fullName: string;

  createDate() {
    let fullFillDate;
    fullFillDate = this.cdtDateTimeService.getCurrentDateTimeInGMT();
    console.log('fullFillDate:'+fullFillDate);
    //fullFillDate = new Date().toLocaleString("en-US", { timeZone: "America/Chicago", hour12: true });
    //fullFillDate = new Date().toLocaleString("en-US", { timeZone: "GMT", hour12: true });
    console.log(fullFillDate);
    // let vals = fullFillDate.split(' ');
    // let dat = vals[0];//03/30/1299
    // let tim = vals[1];//12:32:57
    // let tim2 = vals[2];//AM/PM
    // let dat1 = dat.split('/');
    // let tim1 = tim.split(':');
    // this.month = dat1[0];//03
    // this.date = dat1[1];//30
    // this.year = dat1[2];//1299
    // this.year = dat1[2].replace(',', '');
    // this.hours = tim1[0];//12
    // this.minutes = tim1[1];//32
    // this.seconds = tim1[2];//57
    // let fullDate = this.addZeroIfRequired(this.month) + "/" + this.addZeroIfRequired(this.date) + "/" + this.year + " " + this.addZeroIfRequired(this.hours) + ":" + this.addZeroIfRequired(this.minutes) + ":" + this.addZeroIfRequired(this.seconds) + ' ' + tim2;
    this.researchLog.createDate = fullFillDate;
  }

  addZeroIfRequired(value) {
    if (value == undefined || value == null || value == "") return "00";
    return (value != null && value < 10 && value.length <= 1) ? "0" + value : value;
  }

  //Regex using to return just numbers
  regex = /\D/g;

  option = 'logResearch';

  setActions() {
    if (this.option == 'logResearch') {
      this.actions = this.logResearchActions;
    }
    else if (this.option == 'logPhone') {
      this.actions = this.logNoteActions;
    }
    else if (this.option == 'logNotes') {
      this.actions = this.logPhoneActions;
    }
    this.createDate();//this.researchLog.createDate
    this.researchLog.actionType = this.actions[0];
  }

  initialize() {

    this.setActions();
    this.researchLog.researchTimeSpent = "000 00:00";
    this.researchLog.loginName = this.userInfo.loginName;
    this.researchLog.phoneNumber = this.caseInfo.tableContact.phone.replace(this.regex, '');
    this.createDate();//this.researchLog.createDate
    this.researchLog.notes = "";
    this.researchLog.internalUseOnly = "";
    this.researchLog.commitment = this.commitments[0];
    this.researchLog.oldCaseStatus = this.caseInfo.tableGbstElm.title;
    this.researchLog.duedate = "";
    this.researchLog.newCaseStatus = this.caseStatusTypes[0];

    this.researchLog.userObjid = this.userInfo.objid;
    this.researchLog.contactObjid = this.caseInfo.tableContact.objid;
    this.researchLog.firstName = this.caseInfo.tableContact.firstName;
    this.researchLog.lastName = this.caseInfo.tableContact.lastName;
    if (this.caseInfo.tableContact.firstName == undefined) {
      this.caseInfo.tableContact.firstName = '';
    }
    if (this.caseInfo.tableContact.lastName == undefined) {
      this.caseInfo.tableContact.lastName = '';
    }
    this.fullName = this.caseInfo.tableContact.firstName + ' ' + this.caseInfo.tableContact.lastName;
    this.researchLog.caseId = this.caseInfo.caseId;
    this.researchLog.caseObjid = this.caseInfo.tableCase.objid;
  }
  ngOnInit() {
    this.caseInfo = this.caseInfoService.getSelectedCaseInfo();
    this.userInfo = this.userInfoService.getSesssionUserInfo();
    this.initialize();
  }

  ngAfterViewInit() { }


  initialResponseBtn() {
    this.logsService.initialResponse(
      this.researchLog
    ).subscribe(data => {
      this.closeAndRefresh();
    })
  }

  hangUpBtn() {
    this.logsService.hangUp(
      this.researchLog
    ).subscribe(data => {
      this.closeAndRefresh();
    })
  }

  logNotesBtn() {
    this.logsService.logNotes(
      this.researchLog
    ).subscribe(data => {
      this.closeAndRefresh();
    })
  }
  
  logResearchBtn() {
    this.logsService.logResearch(
      this.researchLog
    ).subscribe(data => {
      this.closeAndRefresh();
    })
  }

  //Open select log commitment screen as like in app-compnent
  commitmentBtn() {
    this.openCommitment.open(LogCommitmentComponent,{

    })
  }
  dateTimeChange() {
    this.fullFillDate.open(DateTimeDialogComponent, {
      disableClose: true,
      data: null

    }).afterClosed().subscribe(data => {
      if (data.action == 'Yes') {
        this.researchLog.duedate = data.fullFillDate;
      }
    })
  }

  closeAndRefresh() {
    this.dialogRef.close('Yes');
  }

  cancelDialog() {
    this.dialogRef.close('No');
  }

}