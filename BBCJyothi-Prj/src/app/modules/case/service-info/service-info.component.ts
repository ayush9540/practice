import { ServiceInfo } from '../../../core/models/service-info';
import { Component, OnInit, EventEmitter, Input, ViewChild, ViewContainerRef, Output } from '@angular/core';
import { ServiceInfoService } from '../../../core/services/service-info.service';
import { MatTableDataSource } from '@angular/material';
import { CaseInfo } from 'src/app/core/models/case-info';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HsiaDialogComponent } from '../../../modules/dialogs/hsia-dialog/hsia-dialog.component';
import { ViewIpComponent } from '../../dialogs/view-ip/view-ip.component';
import { BrassService } from '../../../core/services/brass.service';
import { Dialog } from '../../../shared/util/dialog';
import { BillingComponent } from '../billing/billing.component';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { ViewCpeComponent } from '../../dialogs/view-cpe/view-cpe.component';

@Component({
  selector: 'bbw-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.css']
})
export class ServiceInfoComponent implements OnInit {

  @Output() setSelectedServiceInfo = new EventEmitter<any>();

  quantity: number;
  serviceFrom: any;
  serviceTo: any;

  @Input()
  caseInfo: CaseInfo;

  isLoading = true;

  displayedColumns: string[] = ['Conne', 'Status', 'DSL Order ID'];
  displayedColumns2: string[] = ['Subscribed', 'Quantity'];
  displayedColumns3: string[] = ['Options'];

  public serviceInfo: ServiceInfo[] = [];
  dataSource = new MatTableDataSource<any>();
  installedOptionsdataSource = new MatTableDataSource<any>();
  dialogRef: MatDialogRef<ViewIpComponent>;
  dialogRef1: MatDialogRef<ViewCpeComponent>;
  empRole: any;

  lineShred = [
    'Yes',
    'No'
  ];
  lineSplitType = [
    "Business",
    "Consumer",
    "None"
  ]

  OtherInfoSelected = ["Basic", "Yes", "No", "Lease", "IP-CO"];
  remoteWorkerValues = ["Basic", "Yes", "No", "Lease", "IP-CO"];
  serviceLevels = ["Basic", "Plus", "Lease"];

  //Get from back end and assign to this variable
  serviceSpeeds = [];

  offerProducts = ['Single-User', 'Multi-User', 'N/A', '3rd Party BB Access'];


  OptionalInfo = ['Yes', 'No'];

  selectedSubscribedOption: any = {
    "quantity": "0",
    "byoCpeIndicator": "No",
    "natOfferInd": "No",
    "staticIpInd": "No"
  };
  selectedServerInfo = {
    "providerOrderId": "",
    "orderNumber": "",
    "providerOrderStatus": "",
    "dslProvider": "",
    "providerCktNumber": "",
    "soegRequestId": "",
    "dryLoopInd": "",
    "dslamType": "",
    "uban": "",
    "backhaulCircuitNumber": "",
    "lanEndUserIp": "",
    "lanSubnet": "",
    "lanProtocol": "",
    "lanCustomerPvc": "",
    "wanEndUserIp": "",
    "wanSubnet": "",
    "wanProtocol": "",
    "wanBroadcastIp": "",
    "linesplitType": "None",
    "lineShared": "Yes",
    "remoteWorkerInd": "No",
    "offerProduct": "Multi-User",
    "hsiaIndicator": "N",
    "wanCustomerRouterIp": "",
    "hsiaHeldOrdInd": "",
    "serviceClass": "Basic",
    "networkTransportType": "",
    "accessSpeed": "144/144 Kbps",
    "staticIpInd": "",
    "natOfferInd": "",
    "byoCpeIndicator": "",
    "tableInstalledOption": [
      {
        "serviceOptionsName": "",
        "quantity": "",
        "byoCpeIndicator": "",
        "natOfferInd": "",
        "staticIpInd": ""
      }

    ],

  }


  constructor(public dialog: MatDialog,
    private serviceInfoService: ServiceInfoService,
    private dialogBox: Dialog,
    private brassService: BrassService,
    private userInfoService: UserInfoService
  ) {
    //this.selectedRow=0;
  }

  ngOnInit() {
    this.empRole = this.userInfoService.getEmployeeRole();

    this.loadServiceData();

  }

  loadServiceData() {
    let sofId = this.caseInfo.tableSof.sofId;
    let siteId = this.caseInfo.tableSite.siteId;
    let caseId = this.caseInfo.caseId;
    this.serviceInfoService.getServiceInfoData(caseId, siteId, sofId).subscribe(data => {
      //this.serviceInfoService.getServiceInfoData(this.caseInfo.caseId).subscribe(data => {
      this.serviceInfo = this.dataSource.data = data.serviceInfo;
      if (this.serviceInfo != null && this.serviceInfo.length > 0) {
        this.setClickedRow(this.serviceInfo[0]);
      }
      this.serviceSpeeds = data.speeds;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    }
    );
  }

  modifyService() {

    this.isLoading = true;
    let type = this.caseInfo.tableCase.xcaseType;
    let subType = this.caseInfo.tableCase.xcaseSubtype;
    let sofId = this.caseInfo.tableSof.sofId;
    let sofIdPresent: boolean = true;
    if (sofId == null || sofId == undefined || sofId == "") {
      console.log('Setting as SOF_ID not found..');
      sofIdPresent = false;
    }

    if (!sofIdPresent && type == 'Life Cycle' && (subType == 'BW Upgrade' || subType == 'BW Downgrade')) {
      let speedChangeRequestData: any = {};
      speedChangeRequestData.idNumber = this.caseInfo.caseId;
      speedChangeRequestData.loginName = this.userInfoService.getSesssionUserInfo().loginName;
      speedChangeRequestData.caseType = this.caseInfo.tableCase.xcaseType;
      speedChangeRequestData.caseSubtype = this.caseInfo.tableCase.xcaseSubtype;
      speedChangeRequestData.priority = this.caseInfo.tableGbstElmPrty.title;
      speedChangeRequestData.accessSpeed = this.selectedServerInfo.accessSpeed;
      speedChangeRequestData.sofId = this.selectedServerInfo.orderNumber;
      speedChangeRequestData.sofObjid = this.caseInfo.tableSof.objid;
      //Based on conditions need to make API calls
      this.serviceInfoService.copyCaseSpeedChange(speedChangeRequestData).subscribe(data => {
        this.dialogBox.openDialog(data.status == null ? "Speed Change Transaction failed.Please try again" : data.status);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log('something went wrong...');
      });
    } else if (!sofIdPresent && type == 'Life Cycle' && subType == 'Nonpayment Suspend') {
      let suspendRequestData: any = {};
      suspendRequestData.idNumber = this.caseInfo.caseId;
      suspendRequestData.loginName = this.userInfoService.getSesssionUserInfo().loginName;
      suspendRequestData.caseType = this.caseInfo.tableCase.xcaseType;
      suspendRequestData.caseSubtype = this.caseInfo.tableCase.xcaseSubtype;
      suspendRequestData.priority = this.caseInfo.tableGbstElmPrty.title;
      suspendRequestData.accessSpeed = this.selectedServerInfo.accessSpeed;
      suspendRequestData.sofId = this.selectedServerInfo.orderNumber;
      suspendRequestData.sofObjid = this.caseInfo.tableSof.objid;
      //Based on conditions need to make API calls
      this.serviceInfoService.copyCaseSuspend(suspendRequestData).subscribe(data => {
        this.dialogBox.openDialog(data.status == null ? "Suspend Transaction failed.Please try again" : data.status);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log('something went wrong...');
      });
    }
    else {
      /*This may not required */
      let datareq = 'Status';
      let newSpeed = this.selectedServerInfo.accessSpeed;
      this.brassService.updateAction(this.caseInfo.caseId, datareq, newSpeed).subscribe(data => {
        this.dialogBox.openDialog(data.status == null ? "Transaction failed.Please try again" : data.status);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log('something went wrong...');
      });
    }
  }


  addlIPsFilter(instOpt) {
    return (instOpt.serviceOptionsName == 'Addl IPs');
  }

  getQuantityOfAddlIPs(tio) {
    let defaultNum = 5;
    try {
      if (tio == null || tio == undefined) return defaultNum;
      var data = tio.filter(this.addlIPsFilter);
      if (data == null || data.length < 1) {
        return defaultNum;
      }
      else {
        return data[0].quantity <= 0 ? defaultNum : data[0].quantity;
      }
    } catch (err) {
      return defaultNum;
    }
  }

  setClickedRow(row) {

    this.selectedServerInfo = row;
    this.serviceInfoService.setSelectedServiceInfo(this.selectedServerInfo);
    console.log('setClickedRow......');
    this.setSelectedServiceInfo.emit(this.selectedServerInfo);
    this.installedOptionsdataSource.data = this.selectedServerInfo.tableInstalledOption;
    this.serviceFrom = "";
    this.serviceTo = "";
    if (this.selectedServerInfo.lanEndUserIp != null) {

      let ipStr = this.selectedServerInfo.lanEndUserIp;
      let fromIp = "";
      let toIp = "";
      let replaceWith = '.';
      let quantityToAdd = 0;
      quantityToAdd = this.getQuantityOfAddlIPs(this.selectedServerInfo.tableInstalledOption);

      let vals = ipStr.split('.');
      let lastVal = parseInt(vals[vals.length - 1]);
      vals[vals.length - 1] = (lastVal - quantityToAdd).toString();
      fromIp = vals.toString().replace(/,/g, replaceWith);
      console.log(`fromIp value :: ${fromIp}`);
      this.serviceFrom = fromIp;
      console.log(`serviceFrom value :: ${this.serviceFrom}`);
      vals[vals.length - 1] = (lastVal - 1).toString();
      toIp = vals.toString().replace(/,/g, replaceWith);
      this.serviceTo = toIp;

    }
  }

  selectInstallOption(row) {
    this.selectedSubscribedOption = row;
    this.quantity = row.quantity;
    console.log(row.quantity)
  }

  hsiaModal() {

    if (this.selectedServerInfo == undefined || this.selectedServerInfo == null) {
      return;
    }

    const dialogRef = this.dialog.open(HsiaDialogComponent, {
      width: '85%',
      height: '81%',
      data: { "hsiaInfo": this.selectedServerInfo }
    }
    );
  }

  viewIpDialog() {
    this.dialogRef = this.dialog.open(ViewIpComponent, {
      width: '80%',
      disableClose: true,
    })
  }

  viewCpeDialog() {
    if (this.selectedServerInfo == undefined || this.selectedServerInfo == null) {
      return;
    }
    this.dialogRef1 = this.dialog.open(ViewCpeComponent, {
      width: '43%',
      // disableClose: true,
      data: this.selectedServerInfo
    })
  }


}
