import { CaseInfo } from './../../../core/models/case-info';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material';
import { DispatchService } from '../../../core/services/dispatch.service';
import { QueuesService } from '../../../core/services/queues.service';
import { Queues } from 'src/app/core/models/queues';
import { Dialog } from '../../../shared/util/dialog';
import { UserInfoService } from 'src/app/core/services/user-info.service';

@Component({
  selector: 'bbw-dispatch-dialog',
  templateUrl: './dispatch-dialog.component.html',
  styleUrls: ['./dispatch-dialog.component.css']
})
export class DispatchDialogComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public caseInfo: any,
    private userInfoService: UserInfoService,
    private dialog : Dialog,
    public dialogRef: MatDialogRef<DispatchDialogComponent>,
    public dispatchService: DispatchService,
    public queuesService: QueuesService) {
    this.isAvailButtonDisabled = true;
    this.isDispButtonDisabled = true;
    this.isCheckDisabled = true;
    
  }


  queues: Queues[];

  displayedColumns: string[] = ['Queue Name'];
  dataSource = new MatTableDataSource<any>();
  selectedAct: Queues;

  isAvailButtonDisabled: boolean;
  isDispButtonDisabled: boolean;
  isCheckDisabled: boolean;
  ngOnInit() {

  }
  ngAfterViewInit() {
    let local = false;
    if(local){
    this.queuesService.getMockAllQueuesList().subscribe(data => this.queues = this.dataSource.data = data);
    }
    else{
      this.queues = this.dataSource.data = this.queuesService.getLocalAllQueuesList();
    }
  }
  firstOrderSelected: string = "QueueName";
  secondOrderSelected: string = "starts with";
  thirdOrderSelected: string = "Ascending";

  userTextInput: any = "";

  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listClick() {
    this.dataSource.data = [];
    let subOpt = this.secondOrderSelected;
    let sortOpt = this.thirdOrderSelected;
    let queryInput = "";
    queryInput = this.userTextInput;

    this.dispatchService.dispatchListFilter(this.caseInfo.tableCase.objid, subOpt, sortOpt, queryInput)
      .subscribe(
        data => {
          this.queues = this.dataSource.data = data;
        });
    this.dataSource.data = this.queues;
  }

  setClickedRow(row) {
    this.selectedAct = row;
    //this.isAvailButtonDisabled = false;
    this.isDispButtonDisabled = false;
    this.isCheckDisabled = false;
  }

  dispatch() {
    let attuid = this.userInfoService.getSesssionUserInfo().userAttuid;
    this.dispatchService.dispatch(this.caseInfo.caseId, this.selectedAct.objid,attuid).subscribe(data=>{
      this.dialogRef.close();
      this.dialog.openDialog('Case ID ' + this.caseInfo.caseId +' dispatched successfully.');
    },error=>{
      this.dialog.openDialog('Error while dispatching Case ID.');
      this.dialogRef.close();
    })
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  }
