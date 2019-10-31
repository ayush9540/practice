import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PreviousCase } from '../../../core/models/prevCase';
import { CaseInfoService } from '../../../core/services/case-info.service';
import { CaseInfo } from 'src/app/core/models/case-info';

@Component({
  selector: 'bbw-prev-case',
  templateUrl: './prev-case.component.html',
  styleUrls: ['./prev-case.component.css']
})
export class PrevCaseComponent implements OnInit {

  caseInfo: CaseInfo;
  caseId: any = "";
  openDisabled: boolean;
  isLoading = false;
  timeFrame: any = 30;
  previousCase: PreviousCase[] = [];
  displayedColumns: string[] = ['caseId', 'createDate', 'condition', 'status', 'title', 'caseType'];

  constructor(private caseInfoService: CaseInfoService, public dialogRef: MatDialogRef<PrevCaseComponent>, ) {
    this.openDisabled = true;
  }

  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.caseInfo = this.caseInfoService.getSelectedCaseInfo();
    this.caseId = this.caseInfo.caseId;
  }

  openCase() {
    this.dialogRef.close({ "action": "open", "caseData": this.selectedAct });
  }

  ngAfterViewInit() {
    // this.isLoading = true;
    // this.caseInfoService.getPrevCaseDetails(this.caseInfo.caseId).subscribe(data => {
    //   this.previousCase = this.dataSource.data = data;
    //   this.isLoading = false;
    // }, error => {
    //   this.isLoading = false;
    // }
    // );
  }

  loadPrevCases(listBy) {
    if (this.timeFrame == undefined || this.timeFrame == "" || this.timeFrame < 0) {
      this.timeFrame = 0;
    }
    let objid;
    if (listBy == 'site') {
      objid = this.caseInfo.tableSite.objid;
    } else {
      objid = this.caseInfo.tableContact.objid;
    }

    this.caseInfoService.getPrevCaseDetails(this.timeFrame, listBy, this.caseInfo.tableCase.objid, objid)
      .subscribe(data => {
        this.previousCase = this.dataSource.data = data;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      })
  }

  selectedAct: PreviousCase;
  index: number = 0;

  setClickedRow(row, index): void {
    this.selectedAct = row;
    this.index = index;
    console.log('Selected row: ', this.selectedAct);
    this.openDisabled = false;
  }

  closeDialog() {
    this.dialogRef.close({ "action": "doNothing", "caseData": null });
  }
}
