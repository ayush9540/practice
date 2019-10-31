import { SelectContact } from '../../../core/models/select-contact';
import { Component, OnInit, Inject } from '@angular/core';
import { SelectContactService } from '../../../core/services/select-contact.service';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CaseInfoService } from 'src/app/core/services/case-info.service';
import { HttpClient } from '@angular/common/http';
import { CaseContactComponent } from '../../dialogs/case-contact/case-contact.component';
import { Dialog } from 'src/app/shared/util/dialog';


@Component({
  selector: 'bbw-select-contact',
  templateUrl: './select-contact.component.html',
  styleUrls: ['./select-contact.component.css']
})
export class SelectContactComponent implements OnInit {

  caseId: string;
  public firstList: any;
  public secondList: any;
  sortOption = [
    "FirstName", "Last Name", "Site ID", "Site Name", "Phone-ex", "City", "Role",
    "Site Type", "Organization Type", "Organization Name", "State", "Country"
  ];
  subOption = ["Ascending", "Descending"];
  //desibledButton=true;
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneExt', 'siteId', 'siteName', 'city', 'state', 'country',
    'contactRole', 'siteType', 'status', 'orgId', 'orgName', 'accId', 'accName'];
  firstName: string = "";
  lastName: string = "";
  siteId: string = "";
  siteName: string = "";
  orgId: string = "";
  orgName: string = "";
  isLoading = false;
  fromSelect = false;
  index: number;
  dataSource = new MatTableDataSource<any>();
  public selectContact: SelectContact[] = [];
  selectedContact: SelectContact;
  selectedRow: number = 0;
  contactStatus = false;
  desibledButton = true;
  disabledEt = true;
  qryInput: any = "";
  caseInfo: any;
  fullName: string;
  sortOptionValue = this.sortOption[0]
  subOptionValue = this.subOption[0]

  constructor(private selectContactService: SelectContactService,
    public dialogRef: MatDialogRef<SelectContactComponent>, private http: HttpClient,
    private caseInfoService: CaseInfoService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    public dialog1: Dialog,
  ) {
    this.fromSelect = data.fromSelect;
    if (!this.fromSelect) {
      console.log('Opened from select drop down...');
      this.caseInfo = data.caseInfo;
      this.fullName = data.fullName;
      this.desibledButton = true;
      this.selectedRow = 0;
    } else {
      console.log('Opened from case info select...');
    }
  }
  setClickedRow(row, index) {
    this.selectedContact = row;
    this.index = index;
    this.desibledButton = false;
  }

  newContactDetails() {
    const dialogRef = this.dialog.open(CaseContactComponent, {
      width: '80%',
      height: '615px',
      disableClose: true,
      data: { 'isNew': true, 'selectedIndex': -1, 'selectContactData': [] }
    }).afterClosed().subscribe(data => {

    })
  }
  openContactDetails() {
    const dialogRef = this.dialog.open(CaseContactComponent, {
      width: '80%',
      height: '615px',
      disableClose: true,
      data: { 'fromSelect': true, 'isNew': false, 'selectedIndex': this.index, 'selectContactData': this.selectContact }
    }).afterClosed().subscribe(data => {

      // let action = 'use'
      // this.dialogRef.close({'action':action,'contactData':this.selectedTyp});
    })
  }
  // selectedTyp
  ngOnInit() {
    // this.selectContactService.getSelectContact().subscribe(data => this.selectContact=this.dataSource.data=data)
    if (!this.fromSelect) {
      this.caseId = this.caseInfoService.getSelectedCaseInfo().caseId;
      console.log(`caseinfo site iDDDDD:: ${this.caseInfo.tableSite.siteId}`);
      this.siteId = this.caseInfo.tableSite.siteId === undefined ? "" : this.caseInfo.tableSite.siteId;
      this.siteName = this.caseInfo.tableSite.name === undefined ? "" : this.caseInfo.tableSite.name;
      this.orgName = this.caseInfo.tableCase.xorigin == 'Please Specify' ? "" : this.caseInfo.tableCase.xorigin;
      if (this.fullName != ' ' && this.fullName != null) {
        this.firstName = this.fullName.trim().split(" ")[0];
        this.lastName = this.fullName.trim().split(" ")[1] == undefined ? ' ' : this.fullName.trim().split(" ")[1];
      } else {
        console.log(`full name is empty`);
      }
    }
  }

  sendCaseInfoDataToMainScreen() {
    let action = 'use';
    this.dialogRef.close({ 'action': action, 'contactData': this.selectedContact });
  }
  selectClose(row) {
    console.log(`selected row ::: ${row}`);
    this.dialogRef.close('Do Nothing...');
  }

  loadContactData(requestBody: any = {}) {
    //firstName
    let isValid: Boolean = false;
    if (this.firstName !== "" || this.lastName !== "" || this.siteId !== "" || this.siteName !== "" || this.orgId !== "" || this.orgName !== "") {

      this.isLoading = true;
      requestBody.firstName = this.firstName;
      requestBody.lastName = this.lastName;
      requestBody.siteId = this.siteId;
      requestBody.siteName = this.siteName;
      requestBody.orgId = this.orgId;
      requestBody.orgName = this.orgName;
      requestBody.sortBy = 'asc';// need to capture from front  end
      requestBody.orderBy = 'site_id'//need to capture from front end
      requestBody.inactive = "0";

      console.log(`Request body ::: ${requestBody}`);
      if (this.contactStatus) {
        requestBody.inactive = "1";
      }


      this.selectContactService.getSelectContact(requestBody)
        .subscribe(data => {
          this.isLoading = false;
          this.selectContact = this.dataSource.data = data.findContactResponse;
          console.log(`this selectContact ${this.selectContact}`);

        }, error => {
          this.isLoading = false;
          console.log('..something went wrong...')
        });

    } else {
      this.dialog1.openDialog('please provide at least one value');
      return;
    }
  }

  // this.subOptionValue, this.sortOptionValue,
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }
  closeDialog() {
    this.dialogRef.close({ 'action': null, 'contactData': null });
  }
}
