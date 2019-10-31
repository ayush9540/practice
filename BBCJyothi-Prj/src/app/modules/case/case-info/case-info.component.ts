import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CaseInfoService } from '../../../core/services/case-info.service';
import { CaseInfo } from '../../../core/models/case-info';
import { MatDialog } from '@angular/material';
import { MoreInfoDialogComponent } from '../../../shared/components/more-info-dialog/more-info-dialog.component';
import { SelectContactComponent } from '../../dialogs/select-contact/select-contact.component'
import { CaseContactComponent } from '../../dialogs/case-contact/case-contact.component';
import { CaseSiteComponent } from '../../dialogs/case-site/case-site.component';
import { PrevCaseComponent } from '../../dialogs/prev-case/prev-case.component';
import { PreviousCase } from 'src/app/core/models/prevCase';
import { UserInfoService } from 'src/app/core/services/user-info.service';

@Component({
  selector: 'bbw-case-info',
  templateUrl: './case-info.component.html',
  styleUrls: ['./case-info.component.css']
})
export class CaseInfoComponent implements OnInit {

  @Output() changeToComponent = new EventEmitter<number>();

  @Output() openGivenCase = new EventEmitter<any>();

  @Output() enableSave = new EventEmitter<any>();


  public caseInfo: any;//default
  caseInfoDetails: any;

  constructor(private caseInfoService: CaseInfoService,
    public dialog: MatDialog, public caseSite: MatDialog, private userInfoService: UserInfoService,
  ) {
  }
  selectedSubtypeValue = 'Cancel';

  isNew: boolean = false;
  fullName: string;
  roomAndFloor: string;
  country: string;
  cityStateZip: string;
  locationNiid: string;
  empRole: any;

  ngOnInit() {
    this.loadCaseData();
    // code for hide and disable case-info based on logged-in user role
    this.empRole = this.userInfoService.getEmployeeRole();
    console.log("employee role object at case-info.component", this.empRole);
  }

  //If the dropdown value not present in code and a new dropdown 
  //value comes from backend then add the dropdown value to options
  addOptionIfNotPresent() {
    console.log('came here....')
    let types: any[] = Array.from(this.map.keys());
    let type = this.caseInfo.tableCase.xcaseType;
    if (types != undefined && types.indexOf(this.caseInfo.tableCase.xcaseType)) {
      this.map.set(type, [this.caseInfo.tableCase.xcaseSubtype]);
    }
    // this.types.push(this.caseInfo.tableCase.xcaseType);
    // this.subTypes.push(this.caseInfo.tableCase.xcaseSubtype);
  }

  loadCaseData() {
    this.caseInfo = this.caseInfoService.getSelectedCaseInfo();
    // let  a:any = this.caseInfo;
    // console.log(a.isNew);

    //If the dropdown value not present in code and a new dropdown 
    //value comes from backend then add the dropdown value to options
    this.addOptionIfNotPresent();

    if (this.caseInfo.tableContact.firstName == undefined) {
      this.caseInfo.tableContact.firstName = '';
    }
    if (this.caseInfo.tableContact.lastName == undefined) {
      this.caseInfo.tableContact.lastName = '';
    }
    this.fullName = this.caseInfo.tableContact.firstName + ' ' + this.caseInfo.tableContact.lastName;
    if (this.caseInfo.tableAddress.floor == null) {
      this.caseInfo.tableAddress.floor = '';
    }
    if (this.caseInfo.tableAddress.room == null) {
      this.caseInfo.tableAddress.room = '';
    }
    this.roomAndFloor = this.caseInfo.tableAddress.floor + '' + this.caseInfo.tableAddress.room;
    if (this.caseInfo.tableAddress.xCountry == null && this.isNew) {
      this.caseInfo.tableAddress.xCountry = "USA";
    }


    if (this.caseInfo.tableAddress.city == undefined) {
      this.caseInfo.tableAddress.city = '';
    }
    if (this.caseInfo.tableAddress.state == undefined) {
      this.caseInfo.tableAddress.state = '';
    }
    if (this.caseInfo.tableAddress.zipcode == undefined) {
      this.caseInfo.tableAddress.zipcode = '';
    }

    this.cityStateZip = this.caseInfo.tableAddress.city + '' + this.caseInfo.tableAddress.state + '' + this.caseInfo.tableAddress.zipcode;

    console.log("this.caseInfo.tableSite.nidLocation:" + this.caseInfo.tableSite.nidLocation);

    if (this.caseInfo.tableSite.nidLocation == undefined) {
      this.caseInfo.tableSite.nidLocation = '';
    }
  }

  types = [
    "Acct Maintenance",
    "Disconnect",
    "Life Cycle",
    "Request For Service",
    "Record-Only Update",
    "Resume",
    "General Inquiry",
    "Suspend",
    "Technical Support"
  ];
  subTypes = [
    "Auto Detect",
    "Auto Detect - Newsfeed",
    "New",
    "Add connection",
    "BW Upgrade",
    "BW Downgrade",
    "BBN Migration",
    "Disconnect",
    "Supp",
    "C9000 Migration",
    "Cancel",
    "Change",
    "MARO Change",
    "Fraud Resumption",
    "Fraud & Abuse request",
    "Credit & Collections Request",
    "Service Level Upgrade",
    "Service Level Downgrade",
    "Add Option",
    "Delete Option",
    "Record change",
    "Other Service Change",
    "Disconnect for Non-Payment",
    "Customer Requested ",
    "Cancel During Provisioning",
    "Non-Payment Resumption",
    "NxT1",
    "CERFnet Migration",
    "RAR Migration",
    "Suspension for Fraud",
    "Suspension for Non Payment",
    "Technology Change",
    "VISP End User Request",
    "VISP Partner Request",
    "Internet Direct Migration",
    "LIG Migration",
    "New LIG",
    "Rehome",
    "3rd Party Egress",
    "Contract Migration",
    "Billing Migration",
    "ADD VPN",
    "Recap",
    "Inside Move",
    "Outside Move",
    "IP Change Logical Change",
    "Upgrade IP to Unilink",
    ""
  ];
  priorityAndSeverity = [
    "Please Specify",
    "0-Critical",
    "1-High",
    "2-Medium",
    "3-Low",
    "4-No Rush"
  ];
  promaryOperationSystem = [
    "Please Specify",
    "Windows 95/98",
    "Macintosh 7.x",
    "Windows NT",
    "Win NT",
  ];

  authoriz = [
    "NA",
    "Yes",
    "No",
  ];
  isAvail = [
    "NA",
    "Yes",
    "No",
    "Please Specify",
  ];
  cellingTiles = [
    "NA",
    "Yes",
    "No",
    "Please Specify",
  ]
  installTime = [
    "Either",
    "AM",
    "PM",
    "Please Specify"
  ]
  multiPhone = [
    "Please Specify",
    "NA",
    "Yes",
    "No",

  ]
  acceptLowerSpeed = [
    "NA",
    "Yes",
    "No",

  ]
  dewllingType = [
    "Please Specify",
    "Commercial",
    "Single family house",
    "Condominium", "Townhouse",
    "Apartment building",
    "No Facility",
    "Bus Single Building",
    "Bus Hi Rise Single",
    "Bus Hi Rise Multiple",
    "Bus Campus Single",
    "Bus Campus Multiple"
  ]
  contactSite = [
    "Please Specify",
    "Commercial",
    "Single family house",
    "Condominium",
    "Townhouse",
    "Apartment building",
    "No Facility",
    "Bus Single Building",
    "Bus Hi Rise Single",
    "Bus Hi Rise Multiple",
    "Bus Campus Single",
    "Bus Campus Multiple"
  ]

  changeComp(index) {
    this.changeToComponent.emit(index);
  }

  openDialog() {
    const dialogRef = this.dialog.open(MoreInfoDialogComponent, {
      width: '35%',
      disableClose: true,
      // height : '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //Select contact screen from case-info
  selectContactDialog() {
    this.dialog.open(SelectContactComponent, {
      // height: '100%',
      width: '80%',
      data: { 'fromSelect': false, caseInfo: this.caseInfo, fullName: this.fullName }
    }).afterClosed().subscribe(data => {
      this.setCaseDataFromContactDialog(data);
    });
  }

  setCaseDataFromContactDialog(data) {
    if (data == undefined || data == null || data.action == undefined || data.action == null) {
      return;
    }
    console.log('Use/Done button selected so set the site and contact info.');
    let contactSelected = data.contactData;
    //Store Object id also for - change site/contact option from actions dropdown
    this.caseInfo.tableSite.objid = contactSelected.locObjid;
    this.caseInfo.tableContact.objid = contactSelected.conObjid;
    this.caseInfo.tableSite.siteId = contactSelected.siteId;
    // this.caseInfo.tableCase.title = contactSelected.firstName;
    this.caseInfo.tableContact.firstName = contactSelected.firstName;
    this.caseInfo.tableContact.lastName = contactSelected.lastName;
    this.caseInfo.tableSite.name = contactSelected.site;
    this.fullName = contactSelected.firstName + ' ' + contactSelected.lastName;
    this.caseInfo.tableContact.phone = contactSelected.phone;
    this.caseInfo.tableContact.email = contactSelected.eMail;
    this.caseInfo.roleName = contactSelected.roleName;
    console.log(`email ::: ${contactSelected.eMail}`);
    //this.saveButtonVisiblity.emit("prakash");
    //Enable save button once select contact dialog closed with proper data
    this.enableSave.emit();
    console.log(contactSelected.siteId);
  }

  MAT_TAB_COLLAPSED_HEIGHT = '35px';
  MAT_TAB_EXPANDED_HEIGHT = '27px';

  openAddNotesDialog() {

  }

  openCaseContact() {
    const dialogRef = this.dialog.open(CaseContactComponent, {
      width: '80%',
      // height:'570px',
      disableClose: true,
      data: { 'fromSelect': false, 'isNew': false, 'action': 'Existing' }
    }).afterClosed().subscribe(data => {

    })
  }

  openCaseSite() {
    const dialogRef = this.caseSite.open(CaseSiteComponent, {
      width: '80%',
      height: '800px',
      disableClose: true,
      data: { 'fromSelect': false, 'isNew': false, 'action': 'Existing', 'data': null }
    })
  }

  openPrevCase() {
    this.caseSite.open(PrevCaseComponent, {
      width: '80%',
      height: '455px',
      disableClose: true,
    }).afterClosed().subscribe(data => {
      if (data.action == 'open') {
        //open case from here...
        let casedata: PreviousCase = data.caseData;
        this.openGivenCase.emit(casedata.idNumber);
      }
    });
  }

  @ViewChild('billing') billingComp: any;
  @ViewChild('brassComp') brassComp: any;
  @ViewChild('serviceInfoComp') serviceInfoCompRef: any;

  setServiceInfoData(serviceData) {
    //Set selected service info to billing screen...
    console.log('Set selected service info to billing screen...');
    this.billingComp.setSelectedServiceInfo(serviceData);
    //Set selected service info data to brass comp..
    console.log('Set selected service info data to brass comp..');
    this.brassComp.setSelectedServiceInfo(serviceData, this.serviceInfoCompRef);
  }


  //Drop-Downs Values
  private map = new Map<string, string[]>([

    ['Request For Service', ["Add Connection",
      "Add Option",
      "Auto Detect",
      "Auto Detect Usage Reports",
      "BW Downgrade",
      "BW Upgrade",
      "CERF nET Migration",
      "Cancel",
      "Cancel During Provisioning",
      "Change",
      "Cust Requested",
      "Customer Requested Disconnect",
      "Customer Requested Termination",
      "Delete Option",
      "Disconnect",
      "New",
      "Not Applicable",
      "Online IP Request",
      "Other Service Change",
      "Recap",
      "Records Change",
      "Service Level Downgrade",
      "Service Level Upgrade",
      "Technology Change"]],

    ['Acct Maintenance', ['Not Applicable']],

    ['Disconnect', ["Contract Mgmt Requested",
      "Cust Requested",
      "Customer Requested Disconnect",
      "Customer Requested Terminal",
      "Disconnect for Non-Payment"]],

    ['Life Cycle', ["Add Option",
      "Auto-Detect",
      "Auto-Detect Usage Report",
      "BW Downgrade",
      "BW Upgrade",
      "Billing Change",
      "Bundled BBVPN",
      "Change",
      "Contact Changes",
      "Cust DNS Add Rqt",
      "Cust DNS Mod Rqt",
      "Cust IP Request",
      "Cust MFWS Rqt, Delete Options",
      "Cust Pkt Filter Rqt",
      "Cust Reported",
      "Cust Reported Performance",
      "Cust Rqt Static Route",
      "Disconnect",
      "Fraud & Abuse Report",
      "Fraud Resumption",
      "IP Changes",
      "Informational",
      "Mail Service",
      "Network Config",
      "Nonpayment Restoration",
      "Nonpayment Suspend",
      "Not Applicable",
      "Online Ip Request",
      "Provisioning Rework",
      "Record change",
      "Release",
      "Service Level Downgrade",
      "Service Level Upgrade",
      "Suspension for Non-Payment",
      "Technology Change",
      "VPN_Prof_Maint"]],

    ['Billing Inquiry', ["Account Balance",
      "Address Change Request",
      "Adjustment Other",
      "Bill Copies",
      "Bill Explanation",
      "Billing Account Setup Adjustment",
      "DNS Inquiry",
      "Disconnect Adjustment",
      "Disconnect Inquiry",
      "Discount Inquiry",
      "Dispute Price Plan",
      "Equipment Charges",
      "LAC Inquiry",
      "Lock Box address",
      "Name Change Request",
      "Not Applicable",
      "Outage Credit Inquiry",
      "Price Plan Inquiry",
      "Refund Request",
      "Service Network Adjustment",
      "Start/Stop Inquiry"]],

    ['General Inquiry', ["Inquiry", "Not Applicable"]],

    ['Misdirect', ["Internic Questions",
      "Request to Disconnect Account",
      "Transfer to Collections",
      "Transfer to Technical Support",
      "Transfer to other AT&T Entity",
      "Transfer to other AT&T Service",
      "Wrong Number"]],
  ]);

  get typeValues(): string[] {
    return Array.from(this.map.keys());
  }

  get subTypeValues(): string[] {
    let types = this.map.get(this.caseInfo.tableCase.xcaseType);
    return types;
  }

  setDefault(val) {
    this.caseInfo.tableCase.xcaseSubtype = this.map.get(this.caseInfo.tableCase.xcaseType)[0];
  }
}
