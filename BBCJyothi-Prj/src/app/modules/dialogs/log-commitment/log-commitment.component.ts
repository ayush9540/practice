import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { SelectCommitment } from 'src/app/core/models/selectCommitment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, of as observableOf, merge, from } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { Dialog } from '../../../shared/util/dialog';
import { SelectCommitmentService } from '../../../core/services/log-commitment.service';
import { CaseInfo } from 'src/app/core/models/case-info';
import { ConfirmDialogComponent } from '../../../modules/dialogs/confirm-dialog/confirm-dialog.component';
import { CaseInfoService } from '../../../core/services/case-info.service';
import { CommitmentLogComponent } from '../../dialogs/commitment-log/commitment-log.component';
import { DateTimeDialogComponent } from '../../dialogs/date-time-dialog/date-time-dialog.component';
import { UserInfoService } from 'src/app/core/services/user-info.service';

@Component({
  selector: 'bbw-log-commitment',
  templateUrl: './log-commitment.component.html',
  styleUrls: ['./log-commitment.component.css']
})
export class LogCommitmentComponent implements OnInit, AfterViewInit {

  @Output() changeToComponent = new EventEmitter<number>();

  caseInfo: CaseInfo;
  empRole: any;
  isLoading = true;
  deleteDialogStatus: boolean = false;
  deleteDialog: boolean = false;
  selectCommitment: SelectCommitment[] = [];
  dataSource = new MatTableDataSource<any>();
  deleteDisabled: boolean;
  openDisabled: boolean;
  fullFillDateDisabled: boolean;
  resetDisabled: boolean;
  dataLength: number;
  hsiaInfo: any = {
    "tmplteName": ""
  };

  selected2: any;
  selected: any;
  SelectCommitments = [];

  constructor(private dialogCommit: Dialog,
    private selectCommitmentService: SelectCommitmentService,
    public dialog: MatDialog,
    private dialogBox: Dialog,
    private caseInfoService: CaseInfoService,
    public commitLog: MatDialog,
    private userInfoService: UserInfoService,
    public fullFill: MatDialog,
    public dialogRef: MatDialogRef<LogCommitmentComponent>) {
    this.selectedRow = 0;
    this.deleteDisabled = true;
    this.openDisabled = true;
    this.fullFillDateDisabled = true;
    this.resetDisabled = true;
    this.dataLength = 0;
  }
  selectedRow: number;

  changeComp(val) {
    this.changeToComponent.emit(val);
  }

  ngOnInit() {
    this.caseInfo = this.caseInfoService.getSelectedCaseInfo();
    this.empRole = this.userInfoService.getEmployeeRole();
  }

  ngAfterViewInit() {
    this.loadCommitmentData();
  }

  loadCommitmentData() {
    this.isLoading = true;
    this.selectCommitmentService.getSelectCommitmentData(this.caseInfo.tableCase.objid)
      .subscribe(data => {
        this.selectCommitment = this.dataSource.data = data.commitLog;
        if (data.planTmplteHdr != undefined) {
          this.hsiaInfo = data.planTmplteHdr;
        }
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
    this.dataSource.data = this.selectCommitment;
  }
  selectedAct: SelectCommitment;
  displayedColumns: string[] = [
    'Title', 'Warning Date', 'Commit Date', 'Condition', 'Original Date',
    'Complete Date',
    'Organization/Function',
    'Problem Description',
    'Location Information',
    'Information Status',
    'Task Workable',
    'Offset',
    'Jeop Date 3'
  ];


  //Drop-Downs Values
  private map = new Map<string, string[]>([
    ['Title', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Commit Date', ['earlier than', 'later than']]
  ])
  firstOrderSelected: string = "Commit Date";
  secondOrderSelected: string = "earlier than";
  thirdList: string = "Ascending";
  get firstOrders(): string[] {
    return Array.from(this.map.keys());
  }
  get secondOrders(): string[] {
    let orders = this.map.get(this.firstOrderSelected);
    return orders;
  }
  setDefault(val) {
    this.secondOrderSelected = this.map.get(this.firstOrderSelected)[0];
    this.userTextInput = "";
    this.userInput = "";
  }
  thirdOrders = ["Ascending", "Descending"];

  public firstList: any = "";
  public secondList: any = "";
  public userInput: any = "";
  userTextInput: any = "";

  showListClick() {
    this.dataSource.data = [];
    let option = this.firstOrderSelected;
    let subOpt = this.secondOrderSelected;
    let queryInput = "";
    if (this.firstOrderSelected != 'Commit Date') {
      queryInput = this.userTextInput;
    } else {
      try {
        queryInput = (this.userInput.getMonth() + 1) + '/' + this.userInput.getDate() + '/' + this.userInput.getFullYear();
      } catch (err) { }
    }
    console.log(queryInput);
    let sortOpt = this.thirdList;

    this.selectCommitmentService.getSelectCommitmentWithFilter(this.caseInfo.tableCase.objid, option, subOpt, sortOpt, queryInput)
      // .subscribe(data => this.selectCommitment = this.dataSource.data = data);
    this.dataSource.data = this.selectCommitment;
  }

  //Delete Set Row
  setRow(index, direction?) {
    switch (direction) {
      case 'delete':
        console.log("data source data => ", this.dataSource.data);
        let newdata = this.dataSource.data;
        newdata.splice(this.selectedRow, 1);
        this.dataSource.data = newdata;
        if (this.dataSource.data.length == this.selectedRow) {
          this.selectedRow = this.dataSource.data.length - 1;
          break;
        }
      default:
        this.selectedRow = index;
        break;
    }

  }
  size: number = 0;
  selectedIndex: number = -1;
  index: number = 0;
  //Clicked Row
  setClickedRow(row, index): void {
    this.selectedAct = row;
    this.index = index;
    console.log('Selected row: ', this.selectedRow);
    this.deleteDisabled = false;
    this.openDisabled = false;
    this.fullFillDateDisabled = false;
    this.resetDisabled = false;
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
  //================================= Delete Button ============================================================================//
  delete(): void {
    this.confirmUserAction('WARNING!!! YOU ARE ABOUT TO DELETE THIS COMMITMENT FROM THE DATABASE').afterClosed().subscribe(action => {
      if (action == 'Yes') {
        this.isLoading = true;
        this.selectCommitmentService.deleteRecord(this.caseInfo.caseId, this.selectedAct.title, this.selectedAct.objid).subscribe(data => {
          this.loadCommitmentData();
          this.isLoading = false;
          this.showDialog("The Commitment [" + this.selectedAct.title + "] has been deleted");
        }, error => {
          this.isLoading = false;
        })
      } else {
        //Do nothing
        console.log('Not selected ....');
      }
    }, onError => {
      console.log("error -unable to delete =>", onError);
    });
  };
  //==================================Reset===========================================================================//
  reset(): void {
    this.confirmUserAction(' WARNING!!! THIS WILL RESET THE COMMITMENT').afterClosed().subscribe(action => {
      if (action == 'Yes') {
        this.isLoading = true;
        this.selectCommitmentService.resetRecord(this.caseInfo.caseId, this.selectedAct.title, this.selectedAct.objid).subscribe(data => {
          this.loadCommitmentData();
          this.isLoading = false;
          this.showDialog("The Commitment [" + this.selectedAct + "] has been reset");
        }, error => {
          this.isLoading = false;
        })
      } else {
        console.log('Not reset ....');
      }
    })
  }
  //====================================================================================================//
  fullFillDate() {

    this.fullFill.open(DateTimeDialogComponent, {
      disableClose: true,
      data: this.selectedAct.actCmpltime
    }).afterClosed().subscribe(data => {
      if (data.action == 'Yes') {
        this.isLoading = true;
        this.selectCommitmentService.fullFillDateRecord(this.caseInfo.caseId,
          this.selectedAct.title,
          this.selectedAct.objid,
          data.fullFillDate
        ).subscribe(data => {
          this.isLoading = false;
          this.loadCommitmentData();
          this.showDialog("The Commit Fulfill Time for [" + this.selectedAct.title + "] has been modified");
        }, error => {
          this.isLoading = false;
        })
      }
      else {
        //do nothing...
      }
    })
  }
  //==================================================================================================================//
  openCommitment() {
    this.commitLog.open(CommitmentLogComponent, {
      width: "85%",
      height: "94%",
      maxWidth: "95vw",
      disableClose: true,
      data: { 'isNew': false, 'selectedIndex': this.index, 'logData': this.selectCommitment }
    }).afterClosed().subscribe(action => {
      if (action == 'Yes') {
        this.loadCommitmentData();
      }
    });
  }

  newCommitment() {
    this.commitLog.open(CommitmentLogComponent, {
      width: "85%",
      height: "94%",
      maxWidth: "95vw",
      disableClose: false,
      data: { 'isNew': true, 'selectedIndex': -1, 'logData': [] }
    }).afterClosed().subscribe(action => {
      if (action == 'Yes') {
        this.loadCommitmentData();
      }
    });
  }
  cancelDialog(): void {
    this.dialogRef.close();
  }

}
