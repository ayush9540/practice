import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CaseQueryService } from '../../../core/services/case-query.service';
import { CaseQuery } from '../../../core/models/caseQuery';
import { CaseInfoService } from 'src/app/core/services/case-info.service';
import { CaseInfo } from 'src/app/core/models/case-info';
import { DateTimeDialogComponent } from '../date-time-dialog/date-time-dialog.component';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { CaseQueryFindCasesComponent } from '../case-query-find-cases/case-query-find-cases.component';
import { CaseQueryComponent } from '../case-query/case-query.component';
import { Dialog } from 'src/app/shared/util/dialog';


@Component({
  selector: 'bbw-new-case-query',
  templateUrl: './new-case-query.component.html',
  styleUrls: ['./new-case-query.component.css']
})
export class NewCaseQueryComponent implements OnInit, AfterViewInit {

  filterBtnDisabled: boolean = true;
  addBtnDisabled: boolean = true;
  whichSelectDropDisable: boolean = true;
  changeCheckDisabled: boolean = true;
  replaceBtnDisabled: boolean = true;
  saveBtnDisabled: boolean = true;
  removeBtnDisabled: boolean = true;
  removeAllBtnDisabled: boolean = true;
  userTextInput: any = "";
  dateBtnDisabled: any = true;

  selectedProperty: any;
  checkChange: any;
  appCompRef: any;
  caseInfo: CaseInfo;
  constructor(
    public dialogRef: MatDialogRef<NewCaseQueryComponent>,
    public valueDate: MatDialog,
    public caseQuery: MatDialog,
    public casesWindow: MatDialog,
    private caseInfoService: CaseInfoService,
    private caseQueryService: CaseQueryService,
    private userInfoService: UserInfoService,
    private popupMessage: Dialog,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
    this.isNew = data.isNew;
    this.appCompRef = data.appCompRef;
    if (!this.isNew) {
      this.selectedQueryData = data.selectedQueryData;
    }
  }

  isNew: boolean = false;
  selectedQueryData: any = {};

  displayedColumns1: string[] = ['Property'];
  displayedColumns2: string[] = ['Value List'];
  displayedColumns3: string[] = ['Property', 'Operator', 'Value', 'Changeable', 'Change'];

  dataSource1 = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();

  selectFirsts = [];
  dropForOthers = ["starts with", "ends with", "contains", "is in", "is equal to", "is not equal to", "does not start with", "does not end with", "does not contain", "is not like", "sounds like"];
  dropForDates = ["greater than", "greater than or equal to", "less than", "between", "no between", "today", "yesterday", "within last (days)", "within last (hours)"];
  sortResultFields = ["Case ID", "Owner", "Status", "Site Name", "Priority", "Severity", "Contact Last Name", "Parent Case Flag", "Parent Case ID", "Case Sub Type"];
  selectProperty = [];
  selectedDropDownValue: any;
  sortResult: any = {};
  selectedQueryElmData: any = {};
  selectedQueryElmDataIndex: number = 0;
  selectedFilteredValue: string;


  initialize() {
    this.selectProperty = this.dataSource1.data = [
      "Activity *", "Activity Date", "Activity User", "Activity User Proxy",
      "Alt. Contact First Name", "Alt. Contact Last Name", "Alternate Site", "Case Type *",
      "Case District", "Case Region", "Close Date", "Commitment Time", "Condition",
      "Contact First Name", "Contact Last Name", "Contact Alt. Phone", "Contact Main Phone",
      "Contact Role", "Contact Expire", "Contact ID", "Create Date", "Diagnosis Model No",
      "Diagnosis Part Desc", "Diagnosis Part No", "Model Number", "Number", "Originator",
      "Owner", "Parent Case Flag", "Parent Case ID", "Part Description", "Part Number",
      "Priority *", "Queue Name", "Severity *", "Site ID", "Site Name", "Site State",
      "Site Type", "Solution Number", "Solution Path", "Status", "Subcase Commit Date",
      "Title", "Time Zone", "Installed Part Serial Number", "Case Exchange Indicator", "Access Router",
      "AR Port", "AR Slot", "Case Sub Type", "CSU/DSU Make", "CSU/DSU Model",
      "DSL Order ID", "Effective Billing Date", "Expedite", "IP Connective Date", "Planner Actual Date",
      "Planner Due Date", "Planner Original Date", "Planner Title", "Project Number",
      "Router Make", "Router Model", "Service Type", "Site Name", "SNRC*",
      "Special Order", "WOTS Ticket Number", "WOTS Customer Number", "DSL Telephone",
      "Dry Loop/IR Direct", "NTT", "Provider Name"
    ]
  }

  ngOnInit() {
    this.initialize();
    this.caseInfo = this.caseInfoService.getSelectedCaseInfo();
  }

  queries: any[] = [];

  ngAfterViewInit() {

    if (!this.isNew) {
      this.caseQueryService.getCaseQueryDetails(this.selectedQueryData.objid).subscribe(data => {
        this.dataSource3.data = this.queries = data.queries;
        this.sortResult = data.sortResult;
        console.log("sortResult", this.sortResult);
        this.disableRemoveButtons();
      }, error => {
        this.dataSource3.data = [];
        this.sortResult = {};
        this.queries = [];
        this.disableRemoveButtons();
      });
    } else {
      this.sortResult.fieldName = this.sortResultFields[0];
      this.sortResult.sortNum = "0";
      this.queries = [];
      this.disableRemoveButtons();
    }
  }

  isItDateType(title) {
    return (title == 'Activity Date' ||
      title == 'Close Date' ||
      title == 'Commitment Time' ||
      title == 'Effective Billing Date' ||
      title == 'Expedite' ||
      title == 'IP Connectivity Date' ||
      title == 'Planner Actual Date' ||
      title == 'Planner Due Date' ||
      title == 'Planner Original Date');
  }

  isFilterBtnRequired(title) {
    return (title == 'Activity *'
      || title == 'Case Type *'
      || title == 'Priority *'
      || title == 'Severity *'
      || title == 'SNRC*');
  }

  setSelectedPropertyRow(row) {
    this.selectedProperty = row;
    if (this.isItDateType(row)) {
      this.selectFirsts = this.dropForDates;
      this.dateBtnDisabled = false;
    }
    else {
      this.selectFirsts = this.dropForOthers;
      this.dateBtnDisabled = true;
    }
    this.selectedDropDownValue = this.selectFirsts[0];
    this.userTextInput = "";
    if (this.isFilterBtnRequired(row)) {
      this.filterBtnDisabled = false;
    } else {
      this.filterBtnDisabled = true;
    }
    this.changeCheckDisabled = this.addBtnDisabled = this.whichSelectDropDisable = false;

  }

  loadFilteredValue() {
    let property = this.selectedProperty;
    this.caseQueryService.getFilteredValue(property).subscribe(data => {
      this.dataSource2.data = data;
    });
  }

  filterValueListBy() {
    this.loadFilteredValue();
  }

  setSelectedFilteredValue(row) {
    this.selectedFilteredValue = row;
  }

  addQueryData() {
    let qryElmData: any = {};
    qryElmData.fieldName = this.selectedProperty;
    qryElmData.operName = this.selectedDropDownValue;
    qryElmData.fieldValue = this.userTextInput;
    qryElmData.promptIndSt = 'No';
    if (this.checkChange) {
      qryElmData.promptIndSt = 'Yes';
    }
    this.queries.push(qryElmData);
    this.dataSource3.data = this.queries;
    this.disableRemoveButtons();
  }

  saveCaseQuery() {

    let queryDetails: any = {};
    queryDetails.userObjid = this.userInfoService.getSesssionUserInfo().objid;
    //if (!this.isNew) {
    queryDetails.objid = this.selectedQueryData.objid;
    queryDetails.title = this.selectedQueryData.title;
    //}
    queryDetails.queries = this.queries;
    queryDetails.sortResult = this.sortResult;
    this.caseQueryService.saveCaseQueryData(queryDetails).subscribe(data => {
      if (!this.isNew) {
        this.cancelDialog();
      } else {
        this.popupMessage.openDialog('New case query saved successfully.');
        this.isNew = false;
      }
    }, error => {
      if (!this.isNew) {
        this.cancelDialog();
      } else {
        this.popupMessage.openDialog('New case query with name "' + queryDetails.title + '" failed to save.');
      }
    });

  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  removeQryElmData() {
    this.queries.splice(this.selectedQueryElmDataIndex, 1);
    this.dataSource3.data = this.queries;
    this.disableRemoveButtons();
  }

  removeAllQryElmData() {
    this.queries = [];
    this.dataSource3.data = this.queries;
    this.disableRemoveButtons();
  }

  disableRemoveButtons() {
    this.selectedQueryElmData = null;
    this.selectedQueryElmDataIndex = null;
    this.selectedProperty = null;
    this.removeBtnDisabled = true;
    this.replaceBtnDisabled = true;
    this.userTextInput = "";
    this.checkChange = false;
    this.addBtnDisabled = true;
    this.whichSelectDropDisable = true;
    this.changeCheckDisabled = true;
    this.filterBtnDisabled = true;
    this.dateBtnDisabled = true;
    if (this.queries == null || this.queries.length < 1) {
      this.removeAllBtnDisabled = true;
    } else {
      this.removeAllBtnDisabled = false;
    }
  }

  findCases() {
    let queryDetails: any = {};
    if (this.selectedQueryElmData == null || this.selectedQueryElmData == undefined) {
      queryDetails.queries = this.queries;
    } else {
      let selectedQry = [];
      selectedQry.push(this.selectedQueryElmData);
      queryDetails.queries = selectedQry;
    }
    queryDetails.sortResult = this.sortResult;
    this.casesWindow.open(CaseQueryFindCasesComponent, {
      width: "80%",
      disableClose: true,
      data: { 'appCompRef': this.appCompRef, 'isFromCaseQuery': false, 'qryDetailsData': queryDetails }
    }).afterClosed().subscribe(data => {

    });

  }

  saveAs() {
    this.caseQuery.open(CaseQueryComponent, {
      width: '50%',
      disableClose: true,
      data: { 'fromSelect': false, 'appCompRef': this }
    }).afterClosed().subscribe(data => {
      if (data != null && data.action == 'save') {
        this.selectedQueryData.title = data.title;
        this.selectedQueryData.objid = null;
        this.saveCaseQuery();
      }
    });
  }

  replaceExistingQryElmData() {
    this.queries[this.selectedQueryElmDataIndex].fieldName = this.selectedProperty;
    this.queries[this.selectedQueryElmDataIndex].operName = this.selectedDropDownValue;
    this.queries[this.selectedQueryElmDataIndex].fieldValue = this.userTextInput;
    if (this.checkChange) {
      this.queries[this.selectedQueryElmDataIndex].promptIndSt = "Yes";
    } else {
      this.queries[this.selectedQueryElmDataIndex].promptIndSt = "No";
    }
    this.disableRemoveButtons();
  }

  setSelectedQueryElmData(row, index) {
    this.selectedQueryElmData = row;
    this.selectedQueryElmDataIndex = index;
    this.userTextInput = this.selectedQueryElmData.fieldValue;
    this.selectedProperty = this.selectProperty[this.selectProperty.indexOf(this.selectedQueryElmData.fieldName)];
    this.selectedDropDownValue = this.selectedQueryElmData.operName;
    this.checkChange = false;
    if (this.selectedQueryElmData.promptIndSt == 'Yes') {
      this.checkChange = true;
    }
    if (this.isItDateType(this.selectedProperty)) {
      this.dateBtnDisabled = false;
    } else {
      this.dateBtnDisabled = true;
    }
    this.filterBtnDisabled = true;
    if (this.isFilterBtnRequired(this.selectedProperty)) {
      this.filterBtnDisabled = false;
    }
    this.removeBtnDisabled = false;
    this.replaceBtnDisabled = false;
    this.addBtnDisabled = false;
    this.changeCheckDisabled = false;
    this.whichSelectDropDisable = false;
  }


  dateTimeChange() {
    this.valueDate.open(DateTimeDialogComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe(data => {
      if (data.action == 'Yes') {
        if (data.fullFillDate != null) {
          this.userTextInput = data.fullFillDate;
        }
      }
    })
  }
}
