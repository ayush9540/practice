import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { CaseQueryService } from 'src/app/core/services/case-query.service';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { NewCaseQueryComponent } from '../new-case-query/new-case-query.component';
import { CaseQueryFindCasesComponent } from '../case-query-find-cases/case-query-find-cases.component';
import { Dialog } from 'src/app/shared/util/dialog';

@Component({
  selector: 'bbw-case-query',
  templateUrl: './case-query.component.html',
  styleUrls: ['./case-query.component.css']
})
export class CaseQueryComponent implements OnInit, AfterViewInit {

  appCompRef: any;
  fromSelect: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<CaseQueryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public newCaseQuery: MatDialog,
    public casesWindow: MatDialog,
    public popupMessage: Dialog,
    private caseQueryService: CaseQueryService,
    private userInfoService: UserInfoService) {
    this.appCompRef = data.appCompRef;
    this.fromSelect = data.fromSelect;
  }

  displayedColumns: string[] = ['Query', 'Owner', 'Availability'];
  dataSource = new MatTableDataSource<any>();

  sharedButton: boolean = true;
  modifyButton: boolean = true;
  renameButton: boolean = true;
  removeButton: boolean = true;

  title: string = "";
  selectedAct: any = {
    "title": "",
    "sharedPersSt": "Shared"
  };

  query: any[] = [];

  setClickedRow(row) {
    if (this.fromSelect) {
      this.selectedAct = row;
      this.disableButtons();
      this.title = Object.create(this.selectedAct.title);
    }
  }

  disableButtons() {
    if (this.selectedAct.ownerLogin == this.userInfoService.getSesssionUserInfo().loginName) {
      this.sharedButton = false;
      this.modifyButton = false;
      this.renameButton = false;
      this.removeButton = false;
    } else {
      this.sharedButton = true;
      this.modifyButton = false;
      this.renameButton = true;
      this.removeButton = true;
    }
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let userObjid = this.userInfoService.getSesssionUserInfo().objid;
    this.caseQueryService.getCaseQueryList(userObjid).subscribe(data => {
      this.dataSource.data = this.query = data;
    }, error => {
      this.dataSource.data = this.query = [];
    });
  }

  newQuery() {
    this.newCaseQuery.open(NewCaseQueryComponent, {
      width: "80%",
      disableClose: true,
      data: { 'appCompRef': this.appCompRef, 'isNew': true, 'selectedQueryData': null }
    }).afterClosed().subscribe(data => {

    });
    this.dialogRef.close();
  }

  saveTheQuery() {
    console.log('Title entered:' + this.title);
    if (this.title == undefined || this.title == null || this.title.length < 1) {
      this.popupMessage.openDialog('Please enter query name.');
    } else {
      this.dialogRef.close({ 'action': 'save', 'title': this.title });
    }
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  markPersonal() {
    this.caseQueryService.markPersonal(this.selectedAct.objid);
  }

  markShared() {
    this.caseQueryService.markShared(this.selectedAct.objid);
  }

  modify() {
    this.newCaseQuery.open(NewCaseQueryComponent, {
      width: "80%",
      disableClose: true,
      data: { 'appCompRef': this.appCompRef, 'isNew': false, 'selectedQueryData': this.selectedAct }
    }).afterClosed().subscribe(data => {

    });
  }

  rename() {
    this.caseQueryService.renameQuery(this.selectedAct.objid, this.title);
  }

  remove() {
    this.caseQueryService.removeQuery(this.selectedAct.objid);
  }

  find() {
    //Open model and do this on after view init
    this.casesWindow.open(CaseQueryFindCasesComponent, {
      width: "80%",
      disableClose: true,
      data: { 'appCompRef': this.appCompRef, 'isFromCaseQuery': true, 'objid': this.selectedAct.objid }
    }).afterClosed().subscribe(data => {

    });
  }

}
