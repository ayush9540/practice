import { UserInfoService } from './../../../core/services/user-info.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NewWipbinComponent } from '../../dialogs/new-wipbin/new-wipbin.component'
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectWipbin } from '../../../core/models/select-wipbin';
import { WipBinsService } from 'src/app/core/services/wip-bins.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { WipbinsOpsService } from 'src/app/core/services/wipbins-ops.service';
import { Dialog } from 'src/app/shared/util/dialog';
import { QueuesHostComponent } from '../../queues/queues-host/queues-host.component';


@Component({
  selector: 'bbw-wipbins',
  templateUrl: './wipbins.component.html',
  styleUrls: ['./wipbins.component.css']
})
export class WipbinsComponent implements OnInit {

  queueswipbinshost: QueuesHostComponent;
  constructor(public dialogRef: MatDialogRef<NewWipbinComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private wipBinsService: WipBinsService,
    private wipbinsOpsService: WipbinsOpsService,
    private userInfoService:UserInfoService,
    private dialogBox: Dialog,
  ) {
    this.queueswipbinshost = data.event;
  }

  titleCase = ["Title", "Description"];
  subCase = ['starts with', 'ends with', 'contains', 'sounds like'];
  sortOptions = ["Ascending", "Descending"];

  displayedColumns: string[] = ['type', 'idNumber'];
  dataSource = new MatTableDataSource<any>();
  public selectWipbin: SelectWipbin[] = []

  titleValue: any = this.titleCase[0];
  selectSubValue: any = this.subCase[0];
  selectedSortOption: any = this.sortOptions[0];
  qryInput: any = "";
  disabledButton = true;
  empRole:any;

  setClickedRow(row) {
    this.selectedTyp = row;
    this.disabledButton = false;
  }

  public selectedTyp: SelectWipbin;

  ngOnInit() {
    this.refresh();
    this.selectWipbin = this.dataSource.data = this.wipBinsService.getLocalAllWipBinsList();
    this.empRole=this.userInfoService.getEmployeeRole();
  }

  refresh() {
    this.selectedTyp = {
      "objid": null,
      "title": "",
      "description": ""
    };
  }

  closeDialog() {
    this.dialogRef.close();
  }

  newWipbinDialog() {
    this.refresh();
    this.openDialog({ "isNew": true, "wipBinInfo": this.selectedTyp });
  }

  openWipbinDialog() {
    this.openDialog({ "isNew": false, "wipBinInfo": this.selectedTyp });
  }

  openDialog(info) {
    this.dialog.open(NewWipbinComponent, {
      width: '66%',
      disableClose: true,
      data: info
    }).afterClosed().subscribe(data => {
      //do refresh after model closed
      if (data == 'refresh') {
        this.refreshWipBinData();
      }
    })
  }

  refreshWipBinData() {
    console.log('refresh data of wipbin....wipbins');
    this.wipBinsService.getWipBinsList().then(data => {
      this.selectWipbin = this.dataSource.data = data;
      //Need to refresh data in all locations
      this.wipBinsService.setLocalAllWipBinsList(data);
      this.queueswipbinshost.refreshWIPBinsData(data);
    });
  }

  validate() {
    if (this.selectedTyp == undefined || this.selectedTyp.objid == null || this.selectedTyp.objid == undefined) {
      this.dialogBox.openDialog('Select WIPbin to delete.');
      return false;
    }
    return true;
  }

  deleteWipbin() {

    if (!this.validate()) {
      return;
    }
    this.confirmUserAction('Do you want to delete the WIPbin ' + this.selectedTyp.title + '?').afterClosed().subscribe(action => {
      if (action == 'Yes') {
        console.log('Yes selected ....');
        this.wipbinsOpsService.deleteWipbin(this.selectedTyp).subscribe(data => {
          let resp: any = data;
          this.dialogBox.openDialog(resp.message);
          if (resp.status == "SUCCESS") {
            this.refreshWipBinData();
          }
        }, error => {
        });
      } else {
        console.log('No selected ....');
      }
    });
  }

  confirmUserAction(message) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: message
    });
  }

  getWipBins() {
    this.wipBinsService.getWipBinsListBasedOnInputs(this.titleValue, this.selectSubValue, this.selectedSortOption, this.qryInput).subscribe(data => {
      this.selectWipbin = this.dataSource.data = data;
    }, error => {
      this.selectWipbin = this.dataSource.data = [];
    });
  }
}



































































































// import { Component, OnInit } from '@angular/core';
// import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";


// @Component({
//   selector: 'bbw-wipbins',
//   templateUrl: './wipbins.component.html',
//   styleUrls: ['./wipbins.component.css']
// })
// export class WipbinsComponent implements OnInit {

//   constructor(public dialogRef: MatDialogRef<WipbinsComponent>,) { }

//   titleCase=["Title", "Descriptions"];
//   subCase=['starts with', 'ends with', 'contains', 'sounds like'];
//   sortOptions=["Ascending", "Descending"];


//   titleValue: any = this.titleCase[0];
//   selectSubValue: any = this.subCase[0];
//   selectedSortOption: any = this.sortOptions[0];
//   ngOnInit() {
//   }

//   closeDialog() {
//     this.dialogRef.close();
//   }
// }
