import { Assign } from './../../../core/models/assign';
import { WipBinsService } from './../../../core/services/wip-bins.service';
import { AssignService } from '../../../core/services/assign.service';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WipBins } from '../../../core/models/wip-bins';
import { Dialog } from '../../../shared/util/dialog';
import { CaseInfo } from './../../../core/models/case-info';
import { UserInfoService } from 'src/app/core/services/user-info.service';



@Component({
  selector: 'bbw-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.css']
})
export class AssignDialogComponent implements OnInit, AfterViewInit {

  constructor(
    private userInfoService: UserInfoService,
    public wipBinsService: WipBinsService,
    public assignService: AssignService,
    private dialog: Dialog,
    @Inject(MAT_DIALOG_DATA) public caseInfo: CaseInfo,
    public dialogRef: MatDialogRef<AssignDialogComponent>) {
    this.selectedRow = 0;
    this.isAssignButtonDisabled = true;
  }

  isAssignButtonDisabled: boolean;
  selectedRow: number;
  public userInput: any = "";
  assign: Assign[] = [];

  displayedColumns: string[] = ['Last Name', 'First Name', 'Attuid'];
  dataSource = new MatTableDataSource<any>();
  firstOrderSelected: string = "Attuid";
  secondOrderSelected: string = "starts with";
  selectedAct: Assign;

  setClickedRow(row) {
    this.selectedAct = row;
    this.isAssignButtonDisabled = false;

  }

  ngOnInit() {

  }
  ngAfterViewInit() {

  }

  listClick() {
    this.dataSource.data = [];
    let option = this.firstOrderSelected;
    let subOpt = this.secondOrderSelected;
    let queryInput = this.userInput;
    let userObjid = this.userInfoService.getSesssionUserInfo().objid;
    this.assignService.getAssignWithFilter(userObjid, option, subOpt, queryInput)
      .subscribe(
        data => {
          this.assign = this.dataSource.data = data;

        });

  }


  assignClick() {
    let attuid = this.userInfoService.getSesssionUserInfo().userAttuid;
    this.assignService.assignClick(this.caseInfo.caseId, this.selectedAct.userId, attuid).subscribe(data => {
      this.dialogRef.close();
      this.dialog.openDialog('Case ID successfully assigned.');
    }, error => {
      this.dialog.openDialog('Error while assigning case ID.');
      this.dialogRef.close();
    })
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
}
