import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CaseQueryService } from 'src/app/core/services/case-query.service';

@Component({
  selector: 'bbw-case-query-find-cases',
  templateUrl: './case-query-find-cases.component.html',
  styleUrls: ['./case-query-find-cases.component.css']
})
export class CaseQueryFindCasesComponent implements OnInit, AfterViewInit {

  isFromCaseQuery: boolean = false;
  objid: number = 0;
  qryDetailsData: any;
  public caseQueryNewDesign: any[] = []
  dataSource = new MatTableDataSource<any>();
  selectedCaseQuery: any;
  isLoading: boolean = false;

  displayedColumns: string[] = ['caseId', 'owner', 'condition', 'statue', 'type', 'siteName', 'priority',
    'severity', 'contactFirstName', 'contactLastName', 'title', 'serviceType'
  ];

  appCompRef: any;

  constructor(
    public dialogRef: MatDialogRef<CaseQueryFindCasesComponent>,
    private caseQueryService: CaseQueryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isFromCaseQuery = data.isFromCaseQuery;
    this.appCompRef = data.appCompRef;
    if (this.isFromCaseQuery) {
      this.objid = data.objid;
    } else {
      this.qryDetailsData = data.qryDetailsData;
    }
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.isLoading = true;
    if (this.isFromCaseQuery) {
      this.caseQueryService.getCasesBasedOnQuery(this.objid).subscribe(data => {
        this.caseQueryNewDesign = this.dataSource.data = data;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
    } else {
      this.caseQueryService.casesBasedSelectedQueryElm(this.qryDetailsData).subscribe(data => {
        this.caseQueryNewDesign = this.dataSource.data = data;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
    }
  }

  setClickedRow(row) {
    this.selectedCaseQuery = row;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openCase() {
    if (this.selectedCaseQuery != null &&
      this.selectedCaseQuery != undefined &&
      this.selectedCaseQuery.idNumber != undefined) {
      console.log('Open select case id:' + this.selectedCaseQuery.idNumber)
      this.appCompRef.getCaseInfo(this.selectedCaseQuery.idNumber);
      //this.appCompRef.getCaseInfo('12345');
      this.dialogRef.close();
    }
  }

  printList() {

  }
}
