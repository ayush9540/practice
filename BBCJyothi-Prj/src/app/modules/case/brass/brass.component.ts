import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BrassResponse } from 'src/app/core/models/brass';
import { BrassService } from '../../../core/services/brass.service';
import { CaseInfoService } from '../../../core/services/case-info.service';
import { CaseInfo } from '../../../core/models/case-info';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dialog } from '../../../shared/util/dialog';
import { SirCreationDialogComponent } from '../../../shared/components/sir-creation-dialog/sir-creation-dialog.component';
import { ActivityLogService } from '../../../core/services/activity-log.service';
import { ActivityLog } from '../../../core/models/activity-log';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { SirResponse } from '../../../shared/components/sir-creation-dialog/SirResponse';
import { CreateIpDialogComponent } from '../../../modules/dialogs/create-ip-dialog/create-ip-dialog.component';
import { BrassErrorComponent } from 'src/app/shared/components/brass-error/brass-error.component';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { ServiceInfoComponent } from '../service-info/service-info.component';
import { CreateIpLetterService } from 'src/app/core/services/create-ip-letter.service';
import { ActivityAddInfoComponent } from '../../dialogs/activity-add-info/activity-add-info.component';


@Component({
  selector: 'bbw-brass',
  templateUrl: './brass.component.html',
  styleUrls: ['./brass.component.css']
})
export class BrassComponent implements OnInit, AfterViewInit {

  @Output() changeToComponent = new EventEmitter<number>();

  fileNameDialogRef: MatDialogRef<SirCreationDialogComponent>;
  confirmDialogComponentRef: MatDialogRef<ConfirmDialogComponent>;

  basedOnSirResponse: boolean = false;
  activityLog: ActivityLog[] = [];
  caseInfo: CaseInfo;//default
  foods: any[] = [];
  foo: any;
  isLoading = true;
  sirResponseMessage: SirResponse;
  selectedServerInfo: any = {};


  actionTypes = ["Cancel Order", "Prequalification", "Resume Service", "Suspend Service", "Please Specify"];
  ipActionTypes = ["Activate IP", "Reserve IP", "Please Specify"];
  fetchTypes = ["Status", "Charge Code", "Please Specify"];
  ipLetterTypes: any = [];
  //Select by default
  selectedLetterType = this.ipLetterTypes[0];
  selectedActionType = this.actionTypes[4];
  selectedIpActionType = this.ipActionTypes[2];
  selectedFetchType = this.fetchTypes[2];
  empRole: any;


  constructor(private activityLogService: ActivityLogService, private dialogBox: Dialog,
    private brassService: BrassService, private caseInfoService: CaseInfoService,
    private userInfoService: UserInfoService,
    private createIpLetterService: CreateIpLetterService,
    public dialog: MatDialog,
    public activityAddInfo: MatDialog,
    private NewBrassError: MatDialog) {
    this.selectedRow = 0;
  }

  selectedRow: number;


  ngOnInit() {
    this.isLoading = false;
    this.caseInfo = this.caseInfoService.getSelectedCaseInfo();
    this.empRole = this.userInfoService.getEmployeeRole();
    console.log(`emp role object:: ${this.empRole}`);
  }

  ngAfterViewInit() {
    this.refreshLog();
  }

  refreshLog() {
    this.isLoading = true;
    this.activityLogService.getActivityLogData(this.caseInfo.tableCase.objid).subscribe(data => {
      this.activityLog = this.dataSource.data = data;
      this.isLoading = false;
    },
      error => {
        this.isLoading = false;
      }
    );
    this.dataSource.data = this.activityLog;
  }

  selectedAct: ActivityLog;

  size: number = 0;
  selectedIndex: number = -1;

  setClickedRow(row) {
    this.selectedAct = row;
  }

  displayedColumns: string[] = ['Activity', 'Create Date', 'User', 'Additional Information'];

  displayedColumns1: string[] = ['Last Updated', 'Status', 'Notes'];

  dataSource = new MatTableDataSource<any>();
  dataSource1 = new MatTableDataSource<any>();

  changeComp() {
    console.log('In Change Comp...!');
    this.changeToComponent.emit(4);
  }


  validate(val) {
    if (val == "Please Specify") {
      return false;
    }
    return true;
  }

  showDialog(msg) {
    this.dialogBox.openDialog(msg);
  }

  confirmUserAction(message) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: message
    });
  }

  confirmAction(btn) {

    switch (btn) {
      case 'action':
        if (!this.validate(this.selectedActionType)) {
          this.showDialog("Please select an Action Type");
          return;
        }
        this.confirmUserAction('Do you want to send action type "' + this.selectedActionType + '" to BRASS?').afterClosed().subscribe(action => {
          if (action == 'Yes') {
            this.isLoading = true;
            console.log(`action type :: ${this.selectedActionType} :: caseId ${this.caseInfo.caseId}`);
            console.log('Yes selected ....');
            if (this.selectedActionType == this.actionTypes[0]) {
              //cancel;
              this.brassService.cancelOder(this.caseInfo.caseId).subscribe(data => {
                this.refreshLog();
                this.refreshServiceInfoScreen();
                this.isLoading = false;
                this.showDialog(data.message);
              }, error => {
                this.isLoading = false;
                //Not required for now
                //this.showDialog(error.resultMessage);
              })
            }
            else if (this.selectedActionType == this.actionTypes[1]) {
              this.brassService.prequal(this.caseInfo.caseId).subscribe(data => {
                console.log('success');
                this.refreshLog();
                this.isLoading = false;
                this.showAdditionalInfo(data.message);
                //this.showDialog(data.message);
              }, error => {
                this.isLoading = false;
                console.log('failure');
              });
            }
            else if (this.selectedActionType == this.actionTypes[2]) {
              this.brassService.resume(this.caseInfo.caseId).subscribe(data => {
                console.log('success');
                this.refreshLog();
                this.refreshServiceInfoScreen();
                this.isLoading = false;
                this.showDialog(data.message);
              }, error => {
                this.isLoading = false;
                console.log('failure');
              });
            }
            else if (this.selectedActionType == this.actionTypes[3]) {
              this.brassService.suspend(this.caseInfo.caseId).subscribe(data => {
                console.log('success');
                this.refreshLog();
                this.refreshServiceInfoScreen();
                this.isLoading = false;
                this.showDialog(data.message);
              }, error => {
                this.isLoading = false;
                console.log('failure');
              });
            }
          } else {
            console.log('No selected ....');
            //Do nothing
          }
        });
        break;
      case 'ipAction':
        if (!this.validate(this.selectedIpActionType)) {
          this.showDialog("Please select Reserve Type");
          return;
        }
        this.confirmUserAction('Do you want to "' + this.selectedIpActionType + '"?').afterClosed().subscribe(action => {
          let sendAction = 'activateIp';
          if (this.selectedIpActionType == this.ipActionTypes[1]) {
            sendAction = 'reserveIp';
          }
          if (action == 'Yes') {
            console.log('Yes selected ....');
            this.isLoading = true;
            this.brassService.ipAction(this.caseInfo.caseId, sendAction).subscribe(data => {
              this.refreshLog();
              this.isLoading = false;
              this.showDialog(data.message);
            }, error => {
              this.isLoading = false;
              console.log('something went wrong...');
            });
          } else {
            console.log('No selected ....');
            //Do nothing
          }
        });
        break;
      case 'fetch':
        if (!this.validate(this.selectedFetchType)) {
          this.showDialog("Please select Fetch Type");
          return;
        }
        this.confirmUserAction('Do you want to  fetch "' + this.selectedFetchType + '" from BRASS?').afterClosed().subscribe(action => {
          if (action == 'Yes') {
            this.isLoading = true;
            console.log('Yes selected ....');
            let datareq = "ChargeCodes";
            if (this.selectedFetchType == 'Status') {
              datareq = "Status";
            }
            this.brassService.fetchAction(this.caseInfo.caseId, datareq).subscribe(data => {
              this.refreshLog();
              this.isLoading = false;
              this.showDialog(data.status);
            }, error => {
              this.isLoading = false;
              console.log('something went wrong...');
            }
            )
          } else {
            console.log('No selected ....');
            //Do nothing
          }
        });
        break;
    }


  }

  openSIRDialog() {

    this.fileNameDialogRef = this.dialog.open(SirCreationDialogComponent, {
      width: "400px",
      data: this.caseInfo.caseId
    });

    this.fileNameDialogRef.afterClosed().subscribe(result => {
      this.sirResponseMessage = result;
      if (this.sirResponseMessage.resultCode == null && this.sirResponseMessage.resultMessage == null) {
        this.dialogBox.openDialog("Service Instance Request not created");
      } else if (this.sirResponseMessage.resultCode == '200') {
        this.refreshLog();
        this.dialogBox.openDialog("Service Instance Request created successfully.");
        this.basedOnSirResponse = true;
      } else if (this.sirResponseMessage.resultCode == '700') {
        console.log(`error from DME2 client for SIR`);
      }
      console.log('The dialog was closed result' + result);
    });
  }

  additionalInfo() {
    if (this.selectedAct != undefined && this.selectedAct.addInfo != undefined) {
      this.showAdditionalInfo(this.selectedAct.addInfo);
    }
  }

  showAdditionalInfo(message) {
    this.activityAddInfo.open(ActivityAddInfoComponent, {
      disableClose: true,
      width: '42%',
      height: '340px',
      data: message,
    }).afterClosed().subscribe(data => {

    });
  }

  createIp() {
    if (!this.validate(this.selectedLetterType)) {
      this.showDialog("Letter Type must be selected.");
      return;
    }

    const dialogRef = this.dialog.open(CreateIpDialogComponent, {
      width: '50%',
      data: {
        "caseId": this.caseInfo.caseId,
        "letterType": this.selectedLetterType
      }
    }
    );
  }
  openBrassDialog() {

    this.brassService.getBrassErrors(this.caseInfo.caseId).subscribe(data => {
      if (data == null || data.brassError == null || data.brassError.length == 0) {
        this.showDialog("No BRASS errors exist.");
        return;
      }
      this.NewBrassError.open(BrassErrorComponent, {
        width: "60%",
        data: data.brassError
      })
    }, error => {

    });
  }

  disconnectBrass() {
    this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: "Send disconnect message to BRASS?"
    }).afterClosed().subscribe(action => {
      if (action == 'Yes') {
        this.isLoading = true;
        let disconnectRequestData: any = {};
        disconnectRequestData.idNumber = this.caseInfo.caseId;
        disconnectRequestData.loginName = this.userInfoService.getSesssionUserInfo().loginName;
        disconnectRequestData.caseType = this.caseInfo.tableCase.xcaseType;
        disconnectRequestData.caseSubtype = this.caseInfo.tableCase.xcaseSubtype;
        disconnectRequestData.priority = this.caseInfo.tableGbstElmPrty.title;
        disconnectRequestData.accessSpeed = this.selectedServerInfo.accessSpeed;
        disconnectRequestData.sofId = this.selectedServerInfo.orderNumber;
        disconnectRequestData.sofObjid = this.caseInfo.tableSof.objid;
        console.log('send action');
        //May need to call disconnect api call to ordermgmt service..
        //Send disconnect to backend...
        this.brassService.disconnect(disconnectRequestData).subscribe(data => {
          this.refreshLog();
          this.refreshServiceInfoScreen();
          console.log('success');
          this.isLoading = false;
          this.showDialog(data.message);
        }, error => {
          this.isLoading = false;
          console.log('failure');
        });
      } else {
        console.log('Do nothing action');
        //Do nothing.
      }
    });
  }

  serviceInfoCompRef: ServiceInfoComponent;
  setSelectedServiceInfo(selectedServerInfo, serviceInfoCompRef) {
    this.serviceInfoCompRef = serviceInfoCompRef;
    console.log('in BRASS setSelectedServiceInfo method..');
    this.selectedServerInfo = selectedServerInfo;
    console.log('in BRASS setSelectedServiceInfo :selectedServerInfo:' + selectedServerInfo);
    ///Get Ip letters to display
    this.ipLetterTypes = this.createIpLetterService.getListOfIpLetterType(selectedServerInfo);
  }

  refreshServiceInfoScreen() {
    //Refresh service info data
    this.serviceInfoCompRef.loadServiceData();
  }
}
