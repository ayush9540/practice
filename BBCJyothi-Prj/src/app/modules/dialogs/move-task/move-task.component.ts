import { Component, OnInit,Inject, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WipBinsService } from '../../../core/services/wip-bins.service';
import { WipBins } from '../../../core/models/wip-bins';
import { Dialog } from '../../../shared/util/dialog';
import { CaseInfo } from './../../../core/models/case-info';
import { MoveTaskService } from '../../../core/services/move-task.service';
import { UserInfoService } from 'src/app/core/services/user-info.service';

 
@Component({
  selector: 'bbw-move-task',
  templateUrl: './move-task.component.html',
  styleUrls: ['./move-task.component.css']
})
export class MoveTaskComponent implements OnInit, AfterViewInit{

  constructor(
    public wipBinsService: WipBinsService ,
    private userInfoService: UserInfoService,
    public dialogRef: MatDialogRef<MoveTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public caseInfo: CaseInfo,
    private dialog: Dialog,
    public moveTaskService: MoveTaskService,
    ) 
  { 
    this.isMoveButtonDisabled=true;
  }

  
  wipBins: WipBins[];
  displayedColumns: string[] = ['My WIPbins'];
  dataSource = new MatTableDataSource<any>();
  selectedAct: WipBins;
  isMoveButtonDisabled: boolean;

  setClickedRow(row) {
    this.selectedAct = row;
    this.isMoveButtonDisabled = false;
  }
  ngOnInit() {
  }

  ngAfterViewInit(){
    let local = false;
    if (local) {
      this.wipBinsService.getMockAllWipBinList().subscribe(data => this.wipBins = this.dataSource.data = data);
    }
    else {
      this.wipBins = this.dataSource.data = this.wipBinsService.getLocalAllWipBinsList();
    }
  }

  move() {

    let attuid = this.userInfoService.getSesssionUserInfo().userAttuid;
    this.moveTaskService.move(this.caseInfo.caseId, this.selectedAct.objid,attuid).subscribe(data => {
      this.dialogRef.close();
      this.dialog.openDialog('Successfully Case ID Moved.');
    }, error => {
      this.dialog.openDialog('Error While Moving Case ID.');
      this.dialogRef.close();
    })
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

}
