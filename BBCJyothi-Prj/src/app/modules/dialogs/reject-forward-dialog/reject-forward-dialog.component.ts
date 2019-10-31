import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { QueuesService } from 'src/app/core/services/queues.service';
import { Queues } from 'src/app/core/models/queues';
import { RejectForwardService } from 'src/app/core/services/reject-forward.service';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { Dialog } from 'src/app/shared/util/dialog';


@Component({
  selector: 'bbw-reject-forward-dialog',
  templateUrl: './reject-forward-dialog.component.html',
  styleUrls: ['./reject-forward-dialog.component.css']
})
export class RejectForwardDialogComponent implements OnInit {

  queues: Queues[] = [];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private queuesService: QueuesService,
    private userInfoService: UserInfoService,
    private rejectForwardService: RejectForwardService,
    public dialogRef: MatDialogRef<RejectForwardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public caseInfo: any,
    private dialogBox: Dialog, ) { }

  showTable = false;
  displayedColumns: string[] = ['Forward to Queue'];


  queueTable() {
    this.showTable = true;
  }
  sender() {
    this.showTable = false;
    this.selectedAct = null;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let local = false;
    if (local) {
      this.queuesService.getMockAllQueuesList().subscribe(data => this.queues = this.dataSource.data = data);
    }
    else {
      this.queues = this.dataSource.data = this.queuesService.getLocalAllQueuesList();
    }
  }

  selectedAct: Queues;
  reason: string;
  setClickedRow(row) {
    this.selectedAct = row;
  }

  showDialog(msg) {
    this.dialogBox.openDialog(msg);
  }
  returnToSender() {
    //call backend api for reject data.message
    let loginName = this.userInfoService.getSesssionUserInfo().loginName;
    this.rejectForwardService.returnToSender(this.caseInfo.caseId, loginName, this.reason).subscribe(data => {
      this.showDialog(data.message);
      this.cancelDialog();
    });
  }

  forward() {
    //call backend api for forward
    let loginName = this.userInfoService.getSesssionUserInfo().loginName;
    this.rejectForwardService.forward(this.caseInfo.caseId, this.selectedAct.objid, loginName, this.reason).subscribe(data => {
      this.showDialog(data.message);
      this.cancelDialog();
    });
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

}
