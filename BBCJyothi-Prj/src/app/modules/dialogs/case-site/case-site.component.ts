import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CaseSiteService } from '../../../core/services/case-site.service';
import { CaseSite } from '../../../core/models/case-site';
import { CaseInfoService } from 'src/app/core/services/case-info.service';
import { CaseInfo } from 'src/app/core/models/case-info';
import { Dialog } from 'src/app/shared/util/dialog';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { SelectAddressComponent } from '../select-address/select-address.component';
import { NewAddressComponent } from '../new-address/new-address.component';
import { NewAddressService } from 'src/app/core/services/new-address.service';

@Component({
  selector: 'bbw-case-site',
  templateUrl: './case-site.component.html',
  styleUrls: ['./case-site.component.css']
})
export class CaseSiteComponent implements OnInit, AfterViewInit {

  details: any = {};
  caseInfo: any;
  isNew: any;
  fromSelect: any;
  siteInfo: any;
  isLoading: boolean = false;
  empRole: any;
  selectedIndex: number;
  selectSiteDataList: any[] = [];
  disablePrev: boolean = false;
  disableNext: boolean = false;
  // caseSite: CaseSite;
  caseId: string;
  dataSource1 = new MatTableDataSource<any>();
  name: string
  addressInfo: any;
  contactSite: any;
  status: any = "0";
  accountId: any;
  accountName: any;
  buttonDisabled = true;
  billToAddressObjid: any;
  shipToAddressObjid: any;



  constructor(private caseSiteService: CaseSiteService,
    private newAddressService: NewAddressService,
    public dialogRef: MatDialogRef<CaseSiteComponent>, private userInfoService: UserInfoService,
    private caseInfoService: CaseInfoService, public dialogRef1: MatDialogRef<SelectAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog1: MatDialog,
    private dialog: Dialog
  ) {
    this.fromSelect = data.fromSelect;
    this.isNew = data.isNew;
    if (!this.isNew && this.fromSelect) {
      console.log('From select and site details...')
      this.selectSiteDataList = data.selectSiteData;
      this.selectedIndex = data.selectedIndex;
      if (this.selectedIndex != -1) {
        this.siteInfo = Object.create(this.selectSiteDataList[this.selectedIndex]);
      }
      this.disableNextBtn();
      this.disablePrevBtn();
    } else {
      this.disablePrev = this.disableNext = true;
    }

  }

  customerOption = ['Domestic', '.com', 'Concert', 'DSP', 'Government', 'GV Resale', 'International', 'ISP', 'Internal', 'MARO',
    'NTS Carrier', 'NTS Hosting', 'Regular Corporate', 'Re-Marker', 'Reseller Direct', 'VAR/Agent', 'Wholesale',
    'WH End User', 'N/A'];
  selectedCustomer = this.customerOption[0];
  custSubOption = ['CUST', 'INTR', 'RSEL', 'INDV', 'VEND'];
  selectedSubOpt = this.custSubOption[0];

  statusOption = ['Active', 'Inactive'];
  sitestatus = this.statusOption[0];
  sitetObjid: string;
  index: number;


  ngOnInit() {
    this.initialize();
    // code for hide and disable case-info based on logged-in user role
    this.empRole = this.userInfoService.getEmployeeRole();
    console.log("empRole at case-site", this.empRole);

  }

  ngAfterViewInit() {
    if (!this.isNew) {
      this.loadSiteDetailsData();
    } else {
      this.billToAddressObjid = this.shipToAddressObjid = null;
      this.initialize();
    }
  }

  loadSiteDetailsData() {
    if (this.fromSelect) {
      //This is from drop down from select option
      this.sitetObjid = this.siteInfo.objid;
    } else if (this.data.fromSite) {
      this.sitetObjid = this.data.objid;
    } else {
      //This is from case-info site details button
      this.sitetObjid = this.caseInfoService.getSelectedCaseInfo().tableSite.objid;
    }
    this.loadSiteData(this.sitetObjid);
  }

  loadSiteData(objid) {
    this.isLoading = true;
    this.caseSiteService.getSelectedCaseSite(objid).subscribe(data => {
      this.isLoading = false;
      console.log(data);
      this.details = data;
      this.billToAddressObjid = this.details.siteInfo.custBilladdr2address;
      this.shipToAddressObjid = this.details.siteInfo.custShipaddr2address;
      console.log(this.details);
      if (data == undefined || data == null) {
        this.dialog.openDialog('Unable to retrieve site details.');
        this.dialogRef.close();
      }
      this.caseInfo = this.caseInfoService.getSelectedCaseInfo();
      this.status = this.details.siteInfo.status;
      this.accountId = this.details.roleContactInfo[0].orgId;
      this.accountName = this.details.roleContactInfo[0].orgName;

      if (this.details.roleContactInfo != null && this.details.roleContactInfo.length > 0) {
        this.addressInfo = this.details.roleContactInfo[0];
        console.log(this.details);
        this.contactSite = this.details.roleContactInfo.slice(1, this.details.roleContactInfo.length);
        this.dataSource1.data = this.contactSite;
        console.log(this.contactSite);
      }
    }, error => {
      this.isLoading = false;
      this.dialog.openDialog('Unable to retrieve contact details.');
      this.dialogRef.close();
    })
  }

  initialize() {
    this.details = {
      "siteInfo": {
        "siteId": "",
        "name": "",
        "status": 0,
        "siteType": "CUST",
        "shipVia": "Please Specify",
        "xcustSubtype": "Regular Corporate"
      },
      "addressInfo": {},
      "countryInfo": {},
      "timeZoneInfo": {},
      "roleContactInfo": []
    }
  }


  displayedColumns1: string[] = [
    'firstName', 'lastName', 'phoneExt', 'contactRole', 'hours', 'mailStop', 'emailAddress', 'faxNumber'
  ]


  selectSiteContactList: any;

  setClickedRow(row) {
    this.selectSiteContactList = row;
    // this.index = index

  }

  next() {
    this.selectedIndex += 1;
    this.disableNextBtn();
    this.siteInfo = Object.create(this.selectSiteDataList[this.selectedIndex]);
    this.loadSiteDetailsData();
  }

  prev() {
    this.selectedIndex -= 1;
    this.siteInfo = Object.create(this.selectSiteDataList[this.selectedIndex]);
    this.loadSiteDetailsData();
    this.disablePrevBtn();
  }

  disableNextBtn() {
    if (this.selectedIndex > 0) {
      this.disablePrev = false;
    }
    if (this.selectSiteDataList.length > 1) {
      this.disableNext = false;
    }
    //disable next button when no next record;
    if (this.selectSiteDataList.length == this.selectedIndex + 1) {
      this.disableNext = true;
    }
  }

  disablePrevBtn() {
    if (this.selectedIndex == 0) {
      this.disablePrev = true;
    }
    //disable previous button when no previous record;
    if (this.selectedIndex < this.selectSiteDataList.length - 1) {
      this.disableNext = false;
    }
  }

  // Note Tab selectSiteContactList   selectChildData      selectParentData    selectContactData

  specialOption = ['do not post', 'front notes tab', 'post full site dialog'];
  selectedSpecialOpt = this.specialOption[0];

  // Bill/Ship To

  billShipOption = ['Please Specify', 'Same Day', 'Overnight', '2 Day', 'Ground'];
  selectedBillOpt = this.billShipOption[0];

  closeDialog() {
    this.dialogRef.close();
  }

  openSelectAddress() {
    const dialogRef1 = this.dialog1.open(SelectAddressComponent, {
      width: '80%',
      disableClose: true,
    }).afterClosed().subscribe(data => {
      if (data.action == 'use') {
        this.isLoading = false;
        //this.assignAddressToSite(data);
        this.setBillShipNotPresent(data.address);
        //Get timezone value too....
        this.loadAddress(data.address.objId, true, false, false);
        //geo code
        //account
        //country,fax country code
        //this.details.addressInfo.billToAddress
        //address || city||' '||state||' '|| zipcode
        //this.details.addressInfo.shipToAddress
      }
    })
  }

  setBillShipNotPresent(address) {
    if (this.billToAddressObjid == null && this.details.addressInfo.billToAddress == null) {
      this.setBillAddress(address);
    }
    if (this.shipToAddressObjid == null && this.details.addressInfo.shipToAddress == null) {
      this.setShipAddress(address);
    }
  }

  assignAddressToSite(data) {
    this.details.addressInfo.objid = data.addressInfo.objId;
    this.details.addressInfo.address = data.addressInfo.address;
    this.details.addressInfo.address_2 = data.addressInfo.address2;
    this.details.addressInfo.city = data.addressInfo.city;
    this.details.addressInfo.state = data.addressInfo.state;
    this.details.addressInfo.zipcode = data.addressInfo.zipcode;
    this.details.addressInfo.xcounty = data.addressInfo.county;
    this.details.countryInfo.name = data.addressInfo.country;
    this.details.timeZoneInfo.name = data.addressInfo.timeZone;
    this.details.timeZoneInfo.name = data.addressInfo.timeZone;
  }

  loadAddress(objid, primary, bill, ship) {
    this.newAddressService.getOpenAddressDetailData(objid).subscribe(data => {
      if (primary) {
        this.assignAddressToSite(data);
        this.setBillShipNotPresent(data.addressInfo);
      }
      else if (bill) {
        this.setBillAddress(data);
      }
      else if (ship) {
        this.setShipAddress(data);
      }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  setNewPrimaryAddress() {
    this.dialog1.open(NewAddressComponent, {
      width: '80%',
      disableClose: true,
      data: { 'fromSite': true, 'isNew': true, 'selectedIndex': -1, 'selectAdrseData': [] }
    }).afterClosed().subscribe(data => {
      if (data != null) {
        let objid = data.addressObjid;
        this.loadAddress(objid, true, false, false);
      }
    })
  }

  setNewBillAddress() {
    this.dialog1.open(NewAddressComponent, {
      width: '80%',
      disableClose: true,
      data: { 'fromSite': true, 'isNew': true, 'selectedIndex': -1, 'selectAdrseData': [] }
    }).afterClosed().subscribe(data => {
      if (data != null) {
        let objid = data.addressObjid;
        this.loadAddress(objid, false, true, false);
      }
    })
  }

  setNewShipAddress() {
    this.dialog1.open(NewAddressComponent, {
      width: '80%',
      disableClose: true,
      data: { 'fromSite': true, 'isNew': true, 'selectedIndex': -1, 'selectAdrseData': [] }
    }).afterClosed().subscribe(data => {
      if (data != null) {
        let objid = data.addressObjid;
        this.loadAddress(objid, false, false, true);
      }
    })
  }


  selectBillAddress() {
    this.dialog1.open(SelectAddressComponent, {
      width: '80%',
      disableClose: true,
    }).afterClosed().subscribe(data => {
      if (data.action == 'use') {
        this.setBillAddress(data.address);
      }
    });
  }

  selectShipAddress() {
    this.dialog1.open(SelectAddressComponent, {
      width: '80%',
      disableClose: true,
    }).afterClosed().subscribe(data => {
      if (data.action == 'use') {
        this.setShipAddress(data.address);
      }
    });
  }

  setBillAddress(address) {
    this.billToAddressObjid = address.objId;
    this.details.addressInfo.billToAddress = address.address + '   ' + address.city + ' ' + address.state + ' ' + address.zipcode;
  }

  setShipAddress(address) {
    this.shipToAddressObjid = address.objId;
    this.details.addressInfo.shipToAddress = address.address + '   ' + address.city + ' ' + address.state + ' ' + address.zipcode;
  }

  sendSiteInfo(siteData) {

    if (siteData.siteInfo.name == undefined || siteData.siteInfo.name == "") {
      this.dialog.openDialog('Please enter site name');
      return false;
    }
    if (siteData.addressInfo.objid == undefined || siteData.addressInfo.objid == "") {
      this.dialog.openDialog('Please select primary address');
      return false;
    }

    this.isLoading = true;
    let siteInfoReq: any = {};
    siteInfoReq.objid = siteData.siteInfo.objid;
    siteInfoReq.siteType = siteData.siteInfo.siteType;
    siteInfoReq.xcustSubtype = siteData.siteInfo.xcustSubtype;
    siteInfoReq.status = siteData.siteInfo.status;
    siteInfoReq.name = siteData.siteInfo.name;
    siteInfoReq.siteId = siteData.siteInfo.siteId;
    siteInfoReq.phone = siteData.siteInfo.phone;
    siteInfoReq.fax = siteData.siteInfo.fax;
    siteInfoReq.primaryAddressObjid = siteData.addressInfo.objid;
    siteInfoReq.billToAddressObjid = this.billToAddressObjid;
    siteInfoReq.shipToAddressObjid = this.shipToAddressObjid;
    siteInfoReq.busOrgObjid = null;
    siteInfoReq.shipVia = siteData.siteInfo.shipVia;

    if (siteInfoReq.objid == null) {
      this.caseSiteService.addSiteInfoData(siteInfoReq).subscribe(data => {
        this.handleSuccessResponse(data);
      }, error => {
        this.isLoading = false;
      });
    } else {
      this.caseSiteService.replaceSiteInfoData(siteInfoReq).subscribe(data => {
        this.handleSuccessResponse(data);
      }, error => {
        this.isLoading = false;
      });
    }
  }

  handleSuccessResponse(data) {
    this.dialog.openDialog(data.message);
    if (data != undefined && data.data != undefined && data.data != null && data.data != "") {
      this.loadSiteData(data.data);
      this.sitetObjid = data.data;
      this.isNew = false;
    }
    this.isLoading = false;
  }

  refreshSiteInfo() {

  }

  addSiteDetails() {
    let siteData: any = {};
    siteData = this.details;
    siteData.objid = null;
    this.sendSiteInfo(siteData);
  }

  replaceSiteDetails() {
    let siteData: any = {};
    siteData = this.details;
    this.sendSiteInfo(siteData);
  }
}
