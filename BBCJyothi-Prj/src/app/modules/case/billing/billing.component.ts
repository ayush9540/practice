import { Component, OnInit, Input, } from '@angular/core';
import { BgateErrorDialogComponent } from '../../dialogs/bgate-error-dialog/bgate-error-dialog.component';
import { SiidDialogComponent } from '../../dialogs/siid-dialog/siid-dialog.component';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CaseInfo } from 'src/app/core/models/case-info';
import { BillingService } from '../../../core/services/billing.service';
import { Observable } from 'rxjs';
import { Billing } from 'src/app/core/models/billing';
import { CaseInfoService } from '../../../core/services/case-info.service';
import { ServiceInfo } from 'src/app/core/models/service-info';
import { CustomerAccount } from 'src/app/core/models/customer-account';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Dialog } from 'src/app/shared/util/dialog';
import { DateTimeDialogComponent } from '../../dialogs/date-time-dialog/date-time-dialog.component';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { CdtDateTimeService } from 'src/app/core/services/cdt-date-time.service';


@Component({
  selector: 'bbw-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  selectDrop = ["Invoice", "Subcase", "RQST", "SOLN", "CR"];
  selectedDropdown: any = 'Invoice';
  tableCustomerAccount: any;
  dataSource = new MatTableDataSource<any>();
  public billing: Billing[] = [];
  customerAccount: CustomerAccount;

  @Input()
  caseInfo: CaseInfo;

  selectedServerInfo: any = {};

  constructor(public dialog: MatDialog,
    private dialogBox: Dialog,
    public fullFillDate: MatDialog,
    private billingService: BillingService,
    private cdtDateTimeService: CdtDateTimeService,
    private userInfoService: UserInfoService) {

  }
  externalId: string;
  ngOnInit() {
    this.initialize();
    // this.billingService.getBillingMocks().subscribe(data => {
    //   this.billing = this.dataSource.data = data;
    // })
  }

  initialize() {
    this.customerAccount = {
      paymentMethod: "Invoice",
      billingAccountNumber: "",
      alternateBillerCode: "",
      contractNumber: "",
      startDate: ""
    };
  }

  setSelectedServiceInfo(selectedServerInfo) {
    console.log('In setSelectedServiceInfo Billing screen...');
    this.selectedServerInfo = selectedServerInfo;
    this.externalId = this.selectedServerInfo.siteId + '-' + this.selectedServerInfo.accessSeq;
    this.billingService.getCustomerAccountData(this.selectedServerInfo.servicePoint2customerAccoun).subscribe(data => {
      if (data == null) {
        this.initialize();
      }
      else {
        this.customerAccount = data;
      }
    }, error => {
      this.initialize();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(BgateErrorDialogComponent, {
      width: '75%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  siidDialog() {
    const dialogRef = this.dialog.open(SiidDialogComponent, {
      width: '80%',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  MAT_TAB_COLLAPSED_HEIGHT = '35px';
  MAT_TAB_EXPANDED_HEIGHT = '27px';

  businessDateValid(disconnectDate) {
    let valid = true;
    let onlyDate = disconnectDate.split(' ')[0];
    const date1 = new Date(onlyDate);
    const date2 = new Date(this.cdtDateTimeService.getCurrentDate('MM/dd/yyyy', 'GMT'));
    const diffDays = this.cdtDateTimeService.daysDiff(date1, date2);
    if (diffDays < 0) {
      return !valid;
    }
    if (this.cdtDateTimeService.monthDiff(date1, date2) > 6) {
      return !valid;
    }
    return valid;
  }

  disconnectBilling() {

    let message = "Send message to billing?";
    let transType = 'C';
    let caseInfo: CaseInfo = this.caseInfo;
    let type = caseInfo.tableCase.xcaseType;
    let subType = caseInfo.tableCase.xcaseSubtype;

    if (type == 'Request For Service' && subType == 'New') {
      transType = 'N';
    }
    if (type == 'Disconnect') {
      transType = 'D';
      message = "Are you sure, you want the disconnect billing for this service?";
    } else {
      console.log('must be clicked only when type is Disconnect and this will trigger disconnect trans for change.');
    }
    //Send disconnect message to Billing?
    //Send disconnect message to BRASS?
    if (this.caseInfo.tableSite.disconnectDate == null || this.caseInfo.tableSite.disconnectDate == "") {
      //Validate date then show this message
      this.dialogBox.openDialog('Enter Billing disconnect date');
      return;
    }
    //Validate date then send request to back end......
    if (!this.businessDateValid(this.caseInfo.tableSite.disconnectDate)) {
      this.dialogBox.openDialog('Enter Billing Disconnect date within 6 months prior to today');
      return;
    }

    //if (this.caseInfo.tableSof.sofId == null || this.caseInfo.tableSof.sofId == undefined || this.caseInfo.tableSof.sofId == "") {
    this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: message
    }).afterClosed().subscribe(action => {
      if (action == 'Yes') {
        //Populated the data and to disconnect billing...
        //Call suspend mapping call
        let disconnectBillingRequestData: any = {};
        disconnectBillingRequestData.idNumber = this.caseInfo.caseId;
        disconnectBillingRequestData.loginName = this.userInfoService.getSesssionUserInfo().loginName;
        disconnectBillingRequestData.caseType = this.caseInfo.tableCase.xcaseType;
        disconnectBillingRequestData.caseSubtype = this.caseInfo.tableCase.xcaseSubtype;
        disconnectBillingRequestData.priority = this.caseInfo.tableGbstElmPrty.title;
        disconnectBillingRequestData.accessSpeed = this.selectedServerInfo.accessSpeed;
        disconnectBillingRequestData.sofId = this.selectedServerInfo.orderNumber;
        disconnectBillingRequestData.sofObjid = this.caseInfo.tableSof.objid;
        //Added the below as required...
        disconnectBillingRequestData.disconnectDate = this.caseInfo.tableSite.disconnectDate;
        disconnectBillingRequestData.siteObjid = this.caseInfo.tableSite.objid;
        disconnectBillingRequestData.transType = transType;
        disconnectBillingRequestData.servPointObjid = this.selectedServerInfo.objid;
        this.billingService.disconnectBilling(disconnectBillingRequestData).subscribe(data => {
          this.dialogBox.openDialog(data.message);
        }, error => {
          console.log('Something went wrong..');
        });
      }
    });
    //}
    //this.updateAccount();
  }


  selectedAct: any = {

  };

  billingStartDate() {
    this.fullFillDate.open(DateTimeDialogComponent, {
      // disableClose: true,
      data: null
    }).afterClosed().subscribe(data => {
      if (data.action == 'Yes') {
        this.customerAccount.startDate = data.fullFillDate;
      }
    })
  }

  serviceStartData() {
    this.fullFillDate.open(DateTimeDialogComponent, {
      // disableClose: true,
      data: null
    }).afterClosed().subscribe(data => {
      if (data.action == 'Yes') {
        this.caseInfo.tableSite.geocode = data.fullFillDate;
      }
    })
  }

  serviceDiscDate() {
    this.fullFillDate.open(DateTimeDialogComponent, {
      // disableClose: true,
      data: null
    }).afterClosed().subscribe(data => {
      if (data.action == 'Yes') {
        this.caseInfo.tableSite.disconnectDate = data.fullFillDate;
      }
    })
  }

  updateAccount() {

    let message = "Send message to billing?";
    let transType = 'C';
    let caseInfo: CaseInfo = this.caseInfo;
    let caseId = caseInfo.caseId;
    let type = caseInfo.tableCase.xcaseType;
    let subType = caseInfo.tableCase.xcaseSubtype;

    if (type == 'Request For Service' && subType == 'New') {
      transType = 'N';
    }
    if (type == 'Disconnect') {
      transType = 'D';
      message = "Are you sure, you want the disconnect billing for this service?";
    }

    this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: message
    }).afterClosed().subscribe(action => {

      if (action == 'Yes') {
        console.log('send action');
        //Send disconnect to backend...
        this.billingService.billingDataToIpgw(caseId, transType).subscribe(data => {
          this.dialogBox.openDialog(data.message);
        }, error => {
          console.log('Something went wrong..');
        });
      } else {
        console.log('Do nothing action');
        //Do nothing.
      }
    });
  }
}

