import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CaseInfoService } from 'src/app/core/services/case-info.service';
import { CaseActionService } from 'src/app/core/services/case-action.service';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { Dialog } from '../../util/dialog';



@Component({
  selector: 'bbw-close-task',
  templateUrl: './close-task.component.html',
  styleUrls: ['./close-task.component.css']
})
export class CloseTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CloseTaskComponent>,
    private caseInfoService: CaseInfoService,
    private caseActionService: CaseActionService,
    private userInfoService: UserInfoService,
    private dialog: Dialog) { }


  statusDropdown = [
    "Closed", "Approved", "Cancelled", "Configured CSU/DSU", "Configured router",
    "Credit Denied", "Pre Payment Rejected", "Rejected", "Replaced CSU/DSU", "Replaced router",
    "SOFA", "To be archived", "Verified"
  ];
  resolutionDropdown = [
    "Please Specify", "Access", "Architectural",
    "AT&T Caused", "Billing", "Cancel - CC", "Cancel - Customer", "Cancel - Customer",
    "Cancel - DNAE", "Cancel - Denied Crdt", "Change Rqt Complete",
    "Customer Caused", "CC Web Referral", "DNS Trouble", "Disconnected",
    "Fulfillment/Provis'g", "Instruction/Inform'n", "Instruction Given",
    "Known Bug", "Network/Server", "Older Complete", "Outside Referral",
    "Resolution Given", "Resumed Service", "Sales Referral", "Subcase Not Needed",
    "Software Shipped", "Task Completed", "Unresolved", "Workstation Hardwr"
  ];

  categryDropdown = [
    "Please Specify", "Network", "Customer Premise", "Misdirect"
  ];
  closurDropdown = [
    "Please Specify", "Refer to Vendor", "Refer to Billing", "Refer CPOC",
    "Refer to sales", "Refer to Ohter Svc"
  ];
  closurResolution = [
    "Not Application"
  ];

  summery: string = "";
  statusValue = this.statusDropdown[0];
  resolutionStatus = this.resolutionDropdown[0];
  categoryStatus = this.categryDropdown[0];
  closureStatus = this.closurDropdown[0];
  closureResuStatus = this.closurResolution[0];

  closeTask() {
    let closeTaskData: any = {};
    //validate dropdown values...
    let caseId = this.caseInfoService.getSelectedCaseInfo().caseId;
    closeTaskData.caseId = caseId;
    closeTaskData.resolution = this.resolutionStatus;
    closeTaskData.categoryType = this.categoryStatus;
    closeTaskData.closureCategory = this.closureStatus;
    closeTaskData.closureResolution = this.closureResuStatus;
    closeTaskData.summary = this.summery;
    closeTaskData.status = this.statusValue;
    closeTaskData.actualPhoneLog = 0;
    closeTaskData.actualResearchTime = 0;
    closeTaskData.capturedPhoneLog = 0;
    closeTaskData.capturedResearchTime = 0;
    let attuid = this.userInfoService.getSesssionUserInfo().userAttuid;
    this.caseActionService.sendCloseTask(attuid, closeTaskData).subscribe(data => {
      console.log('case closed successfully.....');
      //this.dialog.openDialog(data.message);
      this.dialogRef.close('Yes');
    }, error => {
      console.log('failure.....');
    });

  }


  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close('No');
  }
}
