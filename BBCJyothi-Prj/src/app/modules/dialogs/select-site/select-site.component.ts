
import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SelectSiteService } from '../../../core/services/select-site.service';
import { SelectSite } from '../../../core/models/select-site';
import { CaseInfoService } from 'src/app/core/services/case-info.service';
import { Dialog } from 'src/app/shared/util/dialog';
import { CaseSiteComponent } from '../case-site/case-site.component';


@Component({
  selector: 'bbw-select-site',
  templateUrl: './select-site.component.html',
  styleUrls: ['./select-site.component.css']
})
export class SelectSiteComponent implements OnInit {

  statusValue = ["All", "Customer", "Internal", "Reseller", "Vendor", "Individual"];
  sortOption = ["Site ID", "Site Name", "Address", "City", "State", "Ord ID", "Org Name"];
  subOption = ["Ascending", "Descending"];

  dataSource = new MatTableDataSource<any>();
  public selectSite: SelectSite[] = [];
  selectedSitData: SelectSite = null;
  selectedRowIndex: number;
  desibledButton = true;
  siteStatus = false;


  siteId: string = "";
  siteName: string = "";
  Address: string = "";
  city: string = "";
  state: string = "";
  accountId: string = "";
  accountName: string = "";
  isLoading = false;

  useOrDoneButton: boolean = false;

  constructor(
    private selectSiteService: SelectSiteService,
    public dialogRef: MatDialogRef<SelectSiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialog1: Dialog,
  ) {
    if (data != null && (data.fromEmp || data.fromContact)) {
      this.useOrDoneButton = true;
    }
  }

  siteValue = this.statusValue[0];
  selectedValue = this.sortOption[1];
  selectedSubOpt = this.subOption[0];
  index: number;
  displayedColumns: string[] = ['siteType', 'siteId', 'siteName', 'Address', 'city', 'state', 'status', 'accountId', 'accountName'];

  ngOnInit() {
  }

  useOrDone() {
    if (this.selectedSitData == null || this.selectedSitData == undefined) {
      return;
    }
    this.dialogRef.close({ 'action': 'use', 'siteInfo': this.selectedSitData });
  }

  setClickedRow(row, index) {
    this.selectedSitData = row;
    this.index = index;
    this.desibledButton = false;
  }


  closeDialog() {
    this.dialogRef.close();
  }
  newAllSiteDetails() {
    const dialogRef = this.dialog.open(CaseSiteComponent, {
      width: '80%',
      height: '800px',
      disableClose: true,
      data: { 'isNew': true, 'selectedIndex': -1, 'selectSiteData': [] }
    }).afterClosed().subscribe(data => {

    })

  }
  openAllSiteDetails() {
    const dialogRef = this.dialog.open(CaseSiteComponent, {
      width: '80%',
      height: '800px',
      disableClose: true,
      data: { 'fromSelect': true, 'isNew': false, 'selectedIndex': this.index, 'selectSiteData': this.selectSite }
    }).afterClosed().subscribe(data => {

    })

  }


  loadSiteData() {
    let requestBody: any = {};
    let isValid: Boolean = false;
    if (this.siteId !== "" || this.siteName !== "" || this.Address !== "" || this.state !== "" || this.city !== "" || this.accountId !== "" || this.accountName) {

      this.isLoading = true;
      requestBody.siteId = this.siteId;
      requestBody.siteName = this.siteName;
      requestBody.address = this.Address;
      requestBody.siteType = this.siteValue;
      requestBody.state = this.state;
      requestBody.city = this.city;
      requestBody.accountId = this.accountId;
      requestBody.accountName = this.accountName;
      requestBody.sortBy = this.selectedValue;
      requestBody.orderBy = this.selectedSubOpt;
      requestBody.inactive = "0";
      if (this.siteStatus) {
        requestBody.inactive = "1";
      }

      this.selectSiteService.getSelectContactWithFilter(requestBody).subscribe(data => {
        this.isLoading = false;
        this.selectSite = this.dataSource.data = data.findSiteResponse;
      }, error => {
        this.isLoading = false;
        console.log("something went wrong");
      });
    } else {
      this.isLoading = false;
      this.dialog1.openDialog('please provide at least one value');
    }
  }

}
