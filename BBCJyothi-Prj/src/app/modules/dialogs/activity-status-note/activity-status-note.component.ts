import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CaseInfoService } from 'src/app/core/services/case-info.service';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { ChangeStatusService } from '../../../core/services/change-status.service';
import { CaseInfo } from 'src/app/core/models/case-info';
import { UserInfo } from 'src/app/core/models/user-info';
import { DateTimeDialogComponent } from '../date-time-dialog/date-time-dialog.component';
import { CdtDateTimeService } from 'src/app/core/services/cdt-date-time.service';


@Component({
  selector: 'bbw-activity-status-note',
  templateUrl: './activity-status-note.component.html',
  styleUrls: ['./activity-status-note.component.css']
})
export class ActivityStatusNoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ActivityStatusNoteComponent>,
    public fullFillDate: MatDialog,
    private caseInfoService: CaseInfoService,
    private userInfoService: UserInfoService,
    private cdtDateTimeService: CdtDateTimeService,
    private changeStatusService: ChangeStatusService) {
    this.selectedRow = 0;
  }

  titles: any = ['N/A'];
  cancelReasonsDummy: any = ['N/A', 'ISP Cancel/Error', 'No ILEC Facilities', 'Customer Switched ISP', 'No ILEC Facilities',
    'Technology Change(Cancel/Add Scenario)', 'db Loss of Loop too Great', 'Move', 'Service Disc', 'Loss Line', 'Change TN',
    'Nonpayment', 'Ptol', 'Loop too Long', 'Non-Payment Resumption', 'Digital Loop Carrier', 'Disconnected Planned', 'Duplicate Order',
    'Covad-Initiated Cancellation', 'Address Problem', 'Electronics on Line', 'Customer Request', 'Customer Moving'];

  cancelReasons = ['N/A',
    'C - Address Incorrect',
    'C - Changed Mind',
    'C - Deny Access',
    'C - Duplicate Order',
    'C - Incorrectly Ordered',
    'C - IW - ABF 3rd Party',
    'C - IW - Bldg Mgr Denial',
    'C - IW - No Avail Pairs',
    'C - IW - No Conduit-Path',
    'C - Long Interval',
    'C - No Access(1)',
    'C - No Access(2)',
    'C - No Access(3)',
    'C - No Conduct',
    'C - No Reason',
    'C - No Response',
    'C - Refused Downgrade',
    'C - Site Not Ready',
    'C - System Issue',
    'OC - Incorrect Address',
    'OC - Reissue Required',
    'P - Product Limitation',
    'P - System Limitation',
    'S - Order Create - No WA',
    'S - Order Inject - No WA',
    'S - Reissue Required',
    'F - Deny Service',
    'F - Data Issue',
    'F - Long-Term',
    'F - No Facilities',
    'F - ABF-SDC System-Data',
    'D - Job Action',
    'D - No Access',
    'D - Denied Access',
    'D - Address Incorrect',
    'D - Missed Appointment',
    'D - No Call from Tech',
    'D - Referred to Engr',
    'D - Loop Length Too Long',
    'D - Order Flow Issue',
    'D - Buried Wire/Dig-up',
    'Test Order',
    'DSL Provider system error',
    '3rd party voice provider',
    'Address issues',
    'AT&T system error',
    'C.O. not serviceable',
    'Customer not ready',
    'End User moving',
    'DAML',
    'E.U. refused downgrade',
    'Digital loop issues',
    'No quality for line share',
    'Duplicate order',
    'Employer no longer pays',
    'Excessive loop length',
    'Existing DSL on line',
    'DSL with another provider',
    'Issue with E.U. phone line',
    'Facilities issue',
    'No customer response',
    'Price too high',
    'E.U. unhappy with install',
    'Technology change',
    'Incorrectly Ordered',
    'Other(include description)'];

  dataSource = new MatTableDataSource<any>();
  caseInfo: CaseInfo;
  userInfo: UserInfo;
  selectedAct
  selectedRow: number;
  index: number = 0;
  disableCancelReason = true;
  displayedColumns: string[] = ['Effective Date', 'Hold Reason', 'Contact(s)', 'Cancel Reason'];

  caseStatusTypes = ['Solving', 'Approved', 'Active', 'Awaiting Prepayment', 'Cancelled', 'Cancel Pending', 'Cleared', 'Solving', 'Credit Denied',
    'Credit Denied Hold', 'Closed', 'Data Modified', 'Declined', 'DNS Complete', 'Disconnected', 'In Progress', 'LC Referred Out', 'MTS Cleared',
    'MTS Major Failure', 'MTS On-Hold', "MTS Ref'd ATM NOC", "MTS Ref'd CBBNOC", "MTS Ref'd Cisco", "MTS Ref'd Easylink", "MTS Ref'd Frame NOC",
    "MTS Ref'd INCS TireIV", "MTS Ref'd GCSC", "MTS Ref'd IPT", "MTS Ref'd Lucent", "MTS Ref'd NCR", "MTS Ref'd Netera", "MTS Ref'd Sonet/OCX",
    "MTS Ref'd T3 GRP", "MTS Ref'd to Crefnet", "MTS Ref'd to HSPS", "MTS Ref'd to RMC", "MTS Ref'd VoiceGroup", 'MTS Returned', 'MTS Solving',
    'New', 'On-Hold', 'Pending Acknowldgement', 'Pending Approval', 'Pending Confirmation', 'Pending DNS', 'Pending SSL Cert.', 'Pending Verification',
    'Pre Payment Pending', 'Referred Out', 'Reffered to RFS', 'Rejected', 'Returned', 'Status Update 2', 'Status Update 3', 'Status Update 4',
    'Suspended', 'System Error', 'To Be Suspended', 'To Be Disconnected', 'Verified', 'WSS Cleared', 'WSS Completed', 'WSS DNS Setup Completed',
    'WSS Kit Shipped', 'WSS Letter Printed', 'WSS Out Of Stock', 'WSS Pending BDS', 'Attach DSL Planner Fa'];

  holdReasons = ['CBB Performance Problem', "Lost Access to Customer's", 'Monitoring Service', 'Unable to Conect Customer', "Waiting Customer's Call Back",
    "Waiting for DNS Change", ''];
  statusChange: any = {};

  addZeroIfRequired(value) {
    if (value == undefined || value == null || value == "") return "00";
    return (value != null && value < 10 && value.length <= 1) ? "0" + value : value;
  }

  createDate() {
    let fullFillDate;
    fullFillDate = this.cdtDateTimeService.getCurrentDateTimeInGMT();
    console.log('fullFillDate:' + fullFillDate);
    //fullFillDate = new Date().toLocaleString("en-US", { timeZone: "America/Chicago", hour12: true });
    //fullFillDate = new Date().toLocaleString("en-US", { timeZone: "GMT", hour12: true });
    console.log(fullFillDate);
    // let vals = fullFillDate.split(' ');
    // let dat = vals[0];//03/30/1299
    // let tim = vals[1];//12:32:57
    // let tim2 = vals[2];//AM/PM
    // let dat1 = dat.split('/');
    // let tim1 = tim.split(':');
    // let month = dat1[0];//03
    // let date = dat1[1];//30
    // let year = dat1[2];//1299
    // year = dat1[2].replace(',', '');
    // let hours = tim1[0];//12
    // let minutes = tim1[1];//32
    // let seconds = tim1[2];//57
    // let fullDate = this.addZeroIfRequired(month) + "/" + this.addZeroIfRequired(date) + "/" + year + " " + this.addZeroIfRequired(hours) + ":" + this.addZeroIfRequired(minutes) + ":" + this.addZeroIfRequired(seconds) + ' ' + tim2;
    this.statusChange.createDate = fullFillDate;
  }

  initialize() {
    this.statusChange.loginName = this.userInfo.loginName;
    this.statusChange.userObjid = this.userInfo.objid;
    this.statusChange.contactObjid = this.caseInfo.tableContact.objid;
    this.statusChange.condition = this.caseInfo.tableCondition.title;
    this.statusChange.firstName = this.caseInfo.tableContact.firstName;
    this.statusChange.lastName = this.caseInfo.tableContact.lastName;
    this.statusChange.caseId = this.caseInfo.caseId;
    this.statusChange.caseObjid = this.caseInfo.tableCase.objid;
    this.statusChange.oldCaseStatus = this.caseInfo.tableGbstElm.title;
    this.statusChange.newCaseStatus = this.caseStatusTypes[0];
    this.statusChange.destQueue = "";
    this.statusChange.kir = "";
    this.statusChange.kirdropval = this.titles[0];
    this.statusChange.releaseDate = "";
    this.statusChange.cancelReason = this.cancelReasons[0];
    this.statusChange.holdReason = this.holdReasons[0];
    this.statusChange.effectiveDate = "";
    this.statusChange.contacts = "";
    this.statusChange.notes = "";
    this.createDate();
    if (this.caseInfo.tableContact.firstName == undefined) {
      this.caseInfo.tableContact.firstName = '';
    }
    if (this.caseInfo.tableContact.lastName == undefined) {
      this.caseInfo.tableContact.lastName = '';
    }
  }

  ngOnInit() {
    this.caseInfo = this.caseInfoService.getSelectedCaseInfo();
    this.userInfo = this.userInfoService.getSesssionUserInfo();
    this.initialize();
  }

  changedNewStatusCode(val) {
    console.log('this.statusChange.newCaseStatus' + this.statusChange.newCaseStatus);
    if (this.statusChange.newCaseStatus == 'Cancelled' || this.statusChange.newCaseStatus == 'Cancel Pending') {
      this.statusChange.cancelReason = this.cancelReasons[0];
      this.disableCancelReason = false;
    } else {
      this.statusChange.cancelReason = this.cancelReasons[0];
      this.disableCancelReason = true;
    }
  }

  setClickedRow(row, index): void {
    this.selectedAct = row;
    this.index = index;
    console.log('Selected row: ', this.selectedRow);

  }

  changeStatus() {
    this.changeStatusService.changeStatus(
      this.statusChange
    ).subscribe(data => {
      this.dialogRef.close('Yes');
    })
  }
  dateTimeChange() {
    this.fullFillDate.open(DateTimeDialogComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe(data => {
      if (data.action == 'Yes') {
        this.statusChange.effectiveDate = data.fullFillDate;
      }
    })
  }

  cancelDialog() {
    this.dialogRef.close('No');
  }

}
