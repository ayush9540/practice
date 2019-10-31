import { UserInfoService } from 'src/app/core/services/user-info.service';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CaseContactService } from '../../../core/services/case-contact.service';
import { CaseContact } from '../../../core/models/case-contact';
import { CaseInfoService } from 'src/app/core/services/case-info.service';
import { Dialog } from 'src/app/shared/util/dialog';
import { CaseSiteComponent } from '../case-site/case-site.component';
import { SelectSite } from 'src/app/core/models/select-site';
import { SelectSiteComponent } from '../select-site/select-site.component';
import { CaseSiteService } from 'src/app/core/services/case-site.service';


@Component({
  selector: 'bbw-case-contact',
  templateUrl: './case-contact.component.html',
  styleUrls: ['./case-contact.component.css']
})
export class CaseContactComponent implements OnInit, AfterViewInit {

  details: any = {};
  fullName: string;
  isNew: any;
  fromSelect: any;
  contactInfo: any;
  dnaeInfo: any;
  selectedIndex: number;
  selectContactDataList: any[] = [];
  disablePrev: boolean = false;
  disableNext: boolean = false;
  isLoading: boolean = false;
  index: number;
  public selectSite: SelectSite[] = [];
  disableBtn: boolean = false;
  disabledClearBtn: boolean = true;
  authDisconnect: boolean = false;

  constructor(public dialogRef: MatDialogRef<CaseContactComponent>,
    private caseSiteService: CaseSiteService,
    private caseContactService: CaseContactService, private userInfoService: UserInfoService,
    private caseInfoService: CaseInfoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: Dialog,
    public dialog1: MatDialog,

  ) {

    this.isNew = data.isNew;
    this.fromSelect = data.fromSelect;
    if (!this.isNew && this.fromSelect) {
      console.log('not new and from select');
      this.selectContactDataList = data.selectContactData;
      this.selectedIndex = data.selectedIndex;
      if (this.selectedIndex != -1) {
        this.contactInfo = Object.create(this.selectContactDataList[this.selectedIndex]);
      }
      this.disableNextBtn();
      this.disablePrevBtn();
    } else {
      this.disablePrev = this.disableNext = true;
    }
  }

  optionValue = ['Active', 'Inactive']; //if its 0 active 1 set to Inactive
  subOptionValue = ["Individual", "Business"];
  stateValue = [
    'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'WV', 'WY', 'IL', 'IS',
    'KN', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MS', 'MO', 'MT', 'NC', 'ND', 'NH', 'NE', 'NJ', 'NM',
    'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI'
  ];
  countryValue = ['USA'];
  timeZoneValue = [
    "ALBST", "ALCST", "ALYST", "AST", "AZST", "CST", "EIST",
    "EST", "GMT", "GMT +1", "GMT +10", "GMT +11", "GMT +12",
    "GMT +13", "GMT +2", "GMT +3", "GMT +3.5", "GMT +4", "GMT +5",
    "GMT +5.5", "GMT +6", "GMT +7", "GMT +8", "GMT +9", "GMT -1", "GMT -11",
    "GMT -2", "GMT -3", "GMT -4", "GMT -5", "GMT -6", "GMT -7", "GMT -8", "HST",
    "MST", "NFST", "None", "PST"
  ];
  contactRol = [
    'Please Specify',
    'Alt Tech Contact',
    'ARR DONE',
    'Alt Security Contact',
    'Alt Billing Contact',
    'ATT Auth Agent Rep',
    'ATT PTE Mgr',
    'ATT Sales Manager',
    'ATT ISSAM',
    'ATT Sales Specilist',
    'ATT Sales Case Mgr',
    'ATT InCountrySvcMgr',
    'ATT GCSC Sales',
    'Billing Contact',
    'Branch Manager',
    'CIP Alt Billing Cont',
    'CIP Atl OrdEntr Cont',
    'CIP Atl Provis Cont',
    'CIP Atl Tech Contac',
    'CIP Alt Security Con',
    'CIP Bid Manager',
    'CIP Billing Contact',
    'CIP Contact One',
    'CIP Contact Two',
    'CIP Sales Rep',
    'CIP Security Contact',
    'CIP Shipping Contact',
    'CIP Tech Contact',
    'Confirm Letter Cont',
    'Contact Supervisor',
    'Customer Consultant',
    'DSL Building Contact',
    'DSL End User',
    'DSL CPOC',
    'DSL Alt CPOC',
    'DSL Billing',
    'GV Alt Billing Cont',
    'GV Alt OrdEntry Cont',
    'GV Atl Provisi cntct',
    'GV Alt Security Cont',
    'GV Alt Tech Contact',
    'GV Billing Contact',
    'GV Customer Contact',
    'GV Distributor Cont',
    'GV Sales Rep',
    'GV Security Contact',
    'GV Shipping Contact',
    'GV Tech Contact',
    'IA User', 'MUX Contact', 'MUX Reprogrammer', /*'MIS Alt CPOC', 'MIS CPOC', 'MIS DPOC',
    'MIS DNS Admin', 'MIS DNS Billing', 'MIS DNS Technical', 'MIS OSWF', 'MIS System Engineer',*/
    'Security Contact', 'SINA Contact', 'Shipping Contact', 'Tech Contact', 'Telecom Contact',
    'THOR Contact', 'Unauthorized', 'Usage Report Contact', 'VCPOC', 'VPN CPOC', 'VPN Alt SPIC',
    'VPN Alt CPOC', 'VPN FEC Engineer', 'VPN SPOC', 'VPN End User', 'VPN AE', 'WSS Trans Bus Mgr',
    'WSS Tech Contact', 'WSS Product Mgmt', 'WSS Merchant', 'WSS Keymaster', 'WSS iA Tech Rep',
    'WSS iA Contact', 'WSS Invalid Caller', 'WSS InterNIC Admin', 'WSS Inet Specilist',
    'WSS End-User', 'WSS Customer', 'WSS CAP/MAP Merr', 'WSS CAP/MAP Clier', 'WSS Branch Mangager',
    'WSS Billing Contact', 'WSS Alt Contact', 'WSS Admin Contact', 'WSS ATT Tech', 'WSS ATT Sales',
    'VPN Billing Contact', 'VPN Wel Kit Contact', 'VPN DNS Contact', 'VPN DNS Admin', 'VPN DNS Billing',
    'WICS Billing Contact', 'WSS ATT Employee', 'WSS ATT Int Sales'

  ];

  optionStatus = this.optionValue[0];
  subOption = this.subOptionValue[0];
  stateOption = this.stateValue[0];
  country = this.countryValue[0];
  timeZone = this.timeZoneValue[0];

  empRole: any;
  // contact = this.contactRol[1];

  // opportunity 
  sortOption = ['ALL'];
  selectOpportunity = this.sortOption[0];
  caseContact: CaseContact[] = [];
  dataSource = new MatTableDataSource<any>();
  // dataSource1 = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'OpportunityRole', 'OpportunityId', 'OpportunityObjective', 'OpportunityName', 'OpportunityProject', 'OpportunityDate'
  ];

  disabledButton = true;
  primarySiteInfo: any = {};
  additionalSites: any = {};

  status: any = "0";
  contactObjid: string;

  ngOnInit() {
    this.initialize();
    // code for hide and disable case-info based on logged-in user role
    this.empRole = this.userInfoService.getEmployeeRole();
  }


  ngAfterViewInit() {
    if (!this.isNew) {
      this.loadContactDetailsData();
    } else {
      this.initialize();
    }
  }


  loadContactDetailsData() {
    if (this.fromSelect) {
      //This is from drop down from select option
      this.contactObjid = this.contactInfo.conObjid;
    } else {
      //This is from case-info site details button
      this.contactObjid = this.caseInfoService.getSelectedCaseInfo().tableContact.objid;
    }
    this.loadContactData(this.contactObjid);
  }
  // }

  loadContactData(contactObjid) {
    this.isLoading = true;
    this.caseContactService.getSelectedCaseContact(contactObjid).subscribe(data => {
      // if (data != undefined) {
      this.details = data;
      this.isLoading = false;
      if (data == undefined || data == null) {
        this.dialog.openDialog('Unable to retrieve contact details.');
        this.dialogRef.close();
      }
      console.log(this.details.contactInfo.status);
      this.status = this.details.contactInfo.status;
      if (this.details.roleContactInfo != null && this.details.roleContactInfo.length > 0) {
        this.primarySiteInfo = this.details.roleContactInfo[0];
        this.details.primarySiteInfo = this.primarySiteInfo;
        console.log(this.details);
        this.additionalSites = this.details.roleContactInfo.slice(1, this.details.roleContactInfo.length);
        this.dataSource.data = this.additionalSites;
        console.log(this.additionalSites);
      }
      this.isLoading = false;
      //}
    }, error => {
      this.isLoading = false;
      this.dialog.openDialog('Unable to retrieve contact details.');
      this.dialogRef.close();
    });
  }

  initialize() {
    this.details = {
      "contactInfo": {
        "salutation": "",
        "status": 0
      },
      "addressInfo": {},
      "siteInfo": {
        "siteId": "",
        "siteName": "",
        "region": "",
      },
      "roleContactInfo": [],
      "resellerInfo": {
        "company": "N/A"
      },
      "dnaeInfo": {
        "strata": "Commercial"
      },
      "primarySiteInfo": {
        "roleName": "Please Specify"
      }
    }
    this.primarySiteInfo.roleName = "Please Specify";
  }


  next() {
    this.selectedIndex += 1;
    this.disableNextBtn();
    this.contactInfo = Object.create(this.selectContactDataList[this.selectedIndex]);
    this.loadContactDetailsData();
  }

  prev() {
    this.selectedIndex -= 1;
    this.contactInfo = Object.create(this.selectContactDataList[this.selectedIndex]);
    this.loadContactDetailsData();
    this.disablePrevBtn();
  }

  disableNextBtn() {
    if (this.selectedIndex > 0) {
      this.disablePrev = false;
    }
    if (this.selectContactDataList.length > 1) {
      this.disableNext = false;
    }
    //disable next button when no next record;
    if (this.selectContactDataList.length == this.selectedIndex + 1) {
      this.disableNext = true;
    }
  }

  disablePrevBtn() {
    if (this.selectedIndex == 0) {
      this.disablePrev = true;
    }
    //disable previous button when no previous record;
    if (this.selectedIndex < this.selectContactDataList.length - 1) {
      this.disableNext = false;
    }
  }


  displayedColumns4: string[] = ['siteId', 'siteName', 'addCity', 'addState', 'addCountry', 'addContact']

  // Contact Info

  strataOptions = ['Commercial', 'Federal', 'Global', 'International', 'Middle', 'Small', 'Wholesale', 'Metro', 'Growth'];

  selectedStrataValue = this.strataOptions[0];

  resellerOption = ['N/A', 'Novell', 'Lucent'];
  selectedReseller = this.resellerOption[0];
  selectedTyp: any = {
    "roleName": "Please Specify"
  };

  setClickedRow(row) {
    this.selectedTyp = row;
    this.disabledButton = false
  }

  closeDialog() {
    this.dialogRef.close();
  }

  sendContactInfo(contactData) {

    if (this.primarySiteInfo.roleName == undefined || this.primarySiteInfo.roleName == 'Please Specify') {
      this.dialog.openDialog('Please select contact role');
      return;
    }

    if (contactData.contactInfo.firstName == undefined || contactData.contactInfo.firstName == ""
      || contactData.contactInfo.lastName == undefined || contactData.contactInfo.lastName == ""
      || contactData.contactInfo.phone == undefined || contactData.contactInfo.phone == "") {
      this.dialog.openDialog('First Name, Last Name and Phone number should not be empty')
      return;
    }
    //locObjid

    if (contactData.primarySiteInfo.locObjid == undefined || contactData.primarySiteInfo.locObjid == "") {
      this.dialog.openDialog('Please select site details');
      return;
    }

    let contactInfoReq: any = {
      primarySiteInfo: {}
    };
    contactInfoReq.objid = contactData.contactInfo.objid;
    //First Part
    contactInfoReq.salutation = contactData.contactInfo.salutation;
    contactInfoReq.firstName = contactData.contactInfo.firstName;
    contactInfoReq.lastName = contactData.contactInfo.lastName;
    contactInfoReq.status = contactData.contactInfo.status;
    contactInfoReq.phone = contactData.contactInfo.phone;
    contactInfoReq.fax = contactData.contactInfo.faxNumber;
    contactInfoReq.jobTitle = contactData.contactInfo.title;
    //contactInfoReq.type = contactData.contactInfo.type;//Missing
    contactInfoReq.email = contactData.contactInfo.email;

    //TAB -2
    contactInfoReq.strata = contactData.dnaeInfo.strata;
    contactInfoReq.organization = contactData.contactInfo.xorganization;
    contactInfoReq.pager = contactData.contactInfo.xpager;
    contactInfoReq.region = contactData.primarySiteInfo.region;
    contactInfoReq.reseller = contactData.resellerInfo.company;
    contactInfoReq.homePhone = contactData.contactInfo.xphone2;
    contactInfoReq.pagerPIN = contactData.contactInfo.xpagerPin;
    contactInfoReq.hours = contactData.contactInfo.hours;
    contactInfoReq.authDisconnect = '0';
    if (this.authDisconnect) {
      contactInfoReq.authDisconnect = '1';
    }

    //TAB -1 PART-1
    contactInfoReq.mailStop = contactData.primarySiteInfo.mailStop;
    contactInfoReq.contactRole = this.primarySiteInfo.roleName;
    contactInfoReq.nicHandle = contactData.primarySiteInfo.xnicHandle;
    //TAB -1 PART-2
    contactInfoReq.primarySiteInfo.siteObjid = contactData.primarySiteInfo.locObjid;
    contactInfoReq.primarySiteInfo.siteID = contactData.primarySiteInfo.siteId;
    contactInfoReq.primarySiteInfo.siteName = contactData.primarySiteInfo.site;
    contactInfoReq.primarySiteInfo.address = contactData.primarySiteInfo.address;
    contactInfoReq.primarySiteInfo.address1 = contactData.primarySiteInfo.address1;
    contactInfoReq.primarySiteInfo.city = contactData.primarySiteInfo.city;
    contactInfoReq.primarySiteInfo.state = contactData.primarySiteInfo.state;
    contactInfoReq.primarySiteInfo.zip = contactData.primarySiteInfo.zipcode;
    contactInfoReq.primarySiteInfo.country = contactData.primarySiteInfo.country;
    contactInfoReq.primarySiteInfo.timeZone = contactData.primarySiteInfo.timeZone;

    this.isLoading = true;
    if (contactInfoReq.objid == null) {
      this.caseContactService.addContactInfoData(contactInfoReq).subscribe(data => {
        this.handleSuccessResponse(data);
      }, error => {
        this.isLoading = false;
        //Failure
      });
    } else {
      this.caseContactService.replaceContactInfoData(contactInfoReq).subscribe(data => {
        this.handleSuccessResponse(data);
      }, error => {
        this.isLoading = false;
      });
    }
  }

  handleSuccessResponse(data) {
    this.dialog.openDialog(data.message);
    if (data != undefined && data.data != undefined && data.data != null && data.data != "") {
      this.loadContactData(data.data);
      this.contactObjid = data.data;
      this.isNew = false;
    }
    this.isLoading = false;
  }

  openAllSiteDetails() {
    let siteObjid = "";
    siteObjid = this.details.siteInfo.objid;
    if (siteObjid == null || siteObjid == undefined || siteObjid == "") {
      return;
    }
    this.dialog1.open(CaseSiteComponent, {
      width: '80%',
      height: '800px',
      disableClose: true,
      data: { 'fromSite': true, 'objid': siteObjid, 'isNew': false, 'selectedIndex': this.index, 'selectSiteData': this.selectSite }
    }).afterClosed().subscribe(data => {

    })

  }

  newSiteInfo() {
    this.primarySiteInfo.siteId = "";
    this.primarySiteInfo.site = "";
    this.primarySiteInfo.address = "";
    this.primarySiteInfo.address1 = "";
    this.primarySiteInfo.city = "";
    this.primarySiteInfo.country = "";
    this.primarySiteInfo.zipcode = "";
    this.disableBtn = true;
    this.disabledClearBtn = false;
  }

  clearSiteInfo() {
    this.primarySiteInfo.siteObjid = "";
    this.primarySiteInfo.siteName = "";
    this.primarySiteInfo.address = "";
    this.primarySiteInfo.address1 = "";
    this.primarySiteInfo.city = "";
    this.primarySiteInfo.country = "";
    this.primarySiteInfo.zipcode = "";
    this.disabledClearBtn = false;
  }
  refreshContactInfo() {

  }

  addContactDetails() {
    let contactData: any = {};
    this.details.contactInfo.objid = null;
    contactData = this.details;
    this.sendContactInfo(contactData);
  }

  replaceContactDetails() {
    let contactData: any = {};
    contactData = this.details;
    this.sendContactInfo(contactData);
  }

  selectSiteDialog() {
    this.dialog1.open(SelectSiteComponent, {
      width: "80%",
      height: "653px",
      disableClose: true,
      data: { 'fromContact': true }
    }).afterClosed().subscribe(data => {
      console.log('get the data....');
      if (data != null && data.action == 'use') {
        this.primarySiteInfo.locObjid = data.siteInfo.objid;
        console.log('objid:' + data.siteInfo.objid);
        this.caseSiteService.getTimezoneInfo(data.siteInfo.objid).subscribe(timeZoneDate => {
          if (timeZoneDate != undefined && timeZoneDate != null) {
            console.log('TimeZone value' + timeZoneDate);
            this.primarySiteInfo.tzName = timeZoneDate.name;
            this.details.primarySiteInfo = this.primarySiteInfo;
          }
        }, error => {

        });
        this.primarySiteInfo.siteId = data.siteInfo.siteId;
        this.primarySiteInfo.site = data.siteInfo.siteName;
        this.primarySiteInfo.address = data.siteInfo.address;
        // this.primarySiteInfo.mailStop = data.siteInfo.mailStop;
        this.primarySiteInfo.address1 = data.siteInfo.address2;
        this.primarySiteInfo.city = data.siteInfo.city;
        this.primarySiteInfo.state = data.siteInfo.state;
        this.primarySiteInfo.zipcode = data.siteInfo.zipcode;
        this.primarySiteInfo.country = data.siteInfo.countryName;
        this.details.primarySiteInfo = this.primarySiteInfo;
      }
    });
  }

}
