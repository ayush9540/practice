import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BgateErrorService } from '../../../core/services/bgate-error.service';
import { BgateError } from '../../../core/models/bgate-error';
import { BillingService } from 'src/app/core/services/billing.service';
import { ServiceInfoService } from 'src/app/core/services/service-info.service';
import { ServiceInfo } from 'src/app/core/models/service-info';
import { CaseInfo } from 'src/app/core/models/case-info';
import { CaseInfoService } from 'src/app/core/services/case-info.service';

@Component({
  selector: 'bbw-bgate-error-dialog',
  templateUrl: './bgate-error-dialog.component.html',
  styleUrls: ['./bgate-error-dialog.component.css']
})
export class BgateErrorDialogComponent implements OnInit, AfterViewInit {

  public drop: any = "New";
  selectDrop = ['New', 'Old'];
  dataSource = new MatTableDataSource<any>();
  serviceInfo: ServiceInfo;
  errors: any;
  status: string = 'New';
  isLoading: boolean = true;
  caseInfo: CaseInfo;


  displayedColumns: string[] = ['type1', 'idNumber', 'special', 'name'];
  public bgateError: BgateError[] = [];

  selectedTyp: BgateError = {
    "errorType": "",
    "errorNumber": "",
    "errorDescription": "",
    "errorMessage": "",
    "status": ""
  };

  constructor(private bgateErrorService: BgateErrorService,
    public dialogRef: MatDialogRef<BgateErrorDialogComponent>,
    private _serviceInfoService: ServiceInfoService,
    private billingService: BillingService,
    private caseInfoService: CaseInfoService
  ) { }

  clearDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.caseInfo = this.caseInfoService.getSelectedCaseInfo();
    this.serviceInfo = this._serviceInfoService.getSelectedServiceInfo();
  }

  ngAfterViewInit() {
    this.loadErrors();
    // this.bgateErrorService.getBgateErrorMocks().subscribe(data=>{
    //   this.bgateError = this.dataSource.data=data;
    // });
  }

  initialize() {
    this.selectedTyp = {
      "errorType": "",
      "errorNumber": "",
      "errorDescription": "",
      "errorMessage": "",
      "status": ""
    };
  }
  setClickedRow(row) {
    this.selectedTyp = row;
  }

  loadErrors() {
    this.isLoading = true;
    this.bgateErrorService.getBgateErrors(this.serviceInfo.siteId, this.serviceInfo.accessSeq, this.serviceInfo.serviceName).subscribe(data => {
      this.errors = this.dataSource.data = data;
      this.isLoading = false;
      this.initialize();
    }, error => {
      this.isLoading = false;
    })
  }

  clearBgateErrors() {
    this.bgateErrorService.clearBgateErrors(this.serviceInfo.siteId, this.serviceInfo.accessSeq).subscribe(data => {
      this.loadErrors();
    });
    //this.clearDialog();
  }

  resubmitBgateErrors() {
    //Change request
    let transType = 'C';
    
    let caseInfo: CaseInfo = this.caseInfo;
    let type = caseInfo.tableCase.xcaseType;
    let subType = caseInfo.tableCase.xcaseSubtype;

    if(type == 'Request For Service' && subType == 'New'){
      transType = 'N';
    }
    if (type == 'Disconnect') {
      transType = 'D';
    }
    
    this.bgateErrorService.resubmitBgateErrors(this.caseInfo.caseId, transType, this.serviceInfo.siteId, this.serviceInfo.accessSeq).subscribe(data => {
      this.loadErrors();
    });
    //this.clearDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
