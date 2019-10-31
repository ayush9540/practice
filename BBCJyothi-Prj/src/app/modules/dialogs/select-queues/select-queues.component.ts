import { Component, OnInit, Input, ViewChild, EventEmitter, Output, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectQueue } from '../../../core/models/select-queue';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { SelectQueuesService } from '../../../core/services/select-queues.service';
import { NewSelectQueuesComponent } from '../../dialogs/new-select-queues/new-select-queues.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Dialog } from 'src/app/shared/util/dialog';
import { QueuesHostComponent } from '../../queues/queues-host/queues-host.component';
import { QueuesService } from 'src/app/core/services/queues.service';
import { UserInfoService } from 'src/app/core/services/user-info.service';


@Component({
  selector: 'bbw-select-queues',
  templateUrl: './select-queues.component.html',
  styleUrls: ['./select-queues.component.css']
})
export class SelectQueuesComponent implements OnInit {

  titleDropdown = ["Title"];
  selectedDropdown = ['starts with', 'ends with', 'contains', 'sounds like'];
  sortOptions = ["Ascending", "Descending"]
  displayedColumns: string[] = ['type', 'idNumber', 'name'];
  dataSource = new MatTableDataSource<any>();
  public selectQueue: SelectQueue[] = [];
  selectedTyp: SelectQueue = null;



  titleValue: any = this.titleDropdown[0];
  subOpt: any = this.selectedDropdown[0];
  sortOpt: any = this.sortOptions[0];
  qryInput: any = "";
  disabledButton = true;
  queueswipbinshost: QueuesHostComponent;
  empRole:any;

  constructor(private selectQueuesService: SelectQueuesService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<SelectQueuesComponent>,
    public dialogBox: Dialog,
    private userInfoService:UserInfoService,
    private queuesService: QueuesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.queueswipbinshost = data.event;
    //this.disabledButton=true
  }

  ngOnInit() {
    let local = false;
    if (local) {
      this.selectQueuesService.getMockAllSelectQueues().subscribe(data => {
        this.selectQueue = this.dataSource.data = data;
      });
    }

    this.empRole= this.userInfoService.getEmployeeRole();
  }

  loadAllQueues() {
    this.selectQueuesService.getAllQueues(this.subOpt, this.qryInput, this.sortOpt).subscribe(data => {
      this.selectQueue = this.dataSource.data = data;
      //set and refresh all queues data and my queues data
      this.queuesService.setLocalAllQueuesList(data);
      this.queueswipbinshost.refreshAllQueuesData(data);
    });
  }

  loadQueuesData() {
    this.loadAllQueues();
    this.queuesService.getMyQueuesList().then(data => {
      let queues: any = data;
      //set and refresh all queues data and my queues data
      this.queueswipbinshost.refreshQueuesData(queues);
    });
  }

  setClickedRow(row) {
    this.selectedTyp = row;
    this.disabledButton = false;
  }

  listApi() {
    this.loadAllQueues();
  }

  newSelectQueueDialog() {
    this.dialog.open(NewSelectQueuesComponent, {
      width: '66%',
      disableClose: true,
      data: { 'event': this.queueswipbinshost, "action": 'New', "queueInfo": null }
    }).afterClosed().subscribe(data => {

    });
  }

  openQueueDialog() {
    const dialogRef = this.dialog.open(NewSelectQueuesComponent, {
      width: '66%',
      disableClose: true,
      data: { 'event': this.queueswipbinshost, "action": 'Existing', "queueInfo": this.selectedTyp }
    }).afterClosed().subscribe(data => {

    });
  }

  deleteQueueInfo() {
    this.confirmUserAction('Do you want to delete this queue?').afterClosed().subscribe(action => {
      if (action == 'Yes') {
        console.log('Yes selected ....');
        this.selectQueuesService.deleteQueueInfo(this.selectedTyp.objid).subscribe(data => {
          this.listApi();
          this.dialogBox.openDialog(data.message);
        })
      } else {
        console.log('No selected ....');
        //Do nothing
      }
    });

  }

  confirmUserAction(message) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: message
    });
  }

  closeDialog() {
    this.selectedTyp = null;
    this.dialogRef.close();
  }

}
