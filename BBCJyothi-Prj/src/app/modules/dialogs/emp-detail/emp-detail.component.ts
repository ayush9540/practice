

import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { EmpDetailService } from '../../../core/services/emp-detail.service';
import { EmpDetail } from '../../../core/models/emp-detail';
import { CaseInfoService } from 'src/app/core/services/case-info.service';
import { CaseInfo } from 'src/app/core/models/case-info';
import { Dialog } from 'src/app/shared/util/dialog';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { SelectSiteComponent } from '../select-site/select-site.component';

@Component({
  selector: 'bbw-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.css']
})
export class EmpDetailComponent implements OnInit, AfterViewInit {

  details: any = {};
  caseInfo: any;
  isNew: any;
  fromSelect: any;
  empDetail: any;//one employee record
  isLoading: boolean = false;
  empRole: any;
  selectedIndex: number;
  employeeDataList: any[] = [];//list of employees
  disablePrev: boolean = false;
  disableNext: boolean = false;

  // caseSite: CaseSite;
  caseId: string;

  constructor(private empDetailService: EmpDetailService,
    private caseInfoService: CaseInfoService,
    private userInfoService: UserInfoService,
    public dialogRef: MatDialogRef<EmpDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public selectSite: MatDialog,
    private dialogBox: Dialog,
    private dialog: Dialog
  ) {
    //'isNew': false, 'selectedIndex': this.index, 'employeeData': this.selectEmployees
    this.employeeDataList = data.employeeData;
    this.isNew = data.isNew;
    this.selectedIndex = data.selectedIndex;
    if (this.selectedIndex != -1) {
      this.empDetail = Object.create(this.employeeDataList[this.selectedIndex]);
    }
    this.disableNextBtn();
    this.disablePrevBtn();
  }

  onlineDropdown = ['System Administrator', 'Call Center Agent', 'Call Center Manager', 'Contract Specialist', 'CSR', 'Customer Service Agent',
    'Development Engineer', 'Development Manager', 'DSL - Administrator', 'DSL - Billing', 'DSL - General', 'DSL - Limited',
    'DSL - Supervisor', 'Field Engineer', 'Hotline Engineer', 'Inventory Specialist', 'IP Administrator', 'IP - Expedite', 'IP - General',
    'IP - Limited', 'IP - Supervisor', 'Logistics Manager', 'Marketing Representative', 'MIS - Administrator', 'MIS - Disconnect', 'MIS - Expedite',
    'MIS - General', 'MIS - Limited', 'MIS - Supervisor', 'Product Administrator', 'Product Specialist', 'QA Engineer', 'QA Manager', 'RFS Agent', 'Sales Manager', 'Sales Representative', 'Senior Product Specialist',
    'Site Configuration Manager', 'Support Manager I', 'Support Manager II', 'System User-Admin', 'Technical Product Administrator',
    'Technical Publications Manager', 'Technical Support', 'Technical Writer', 'Telemarketing Agent', 'Telesales Agent', 'Telesales Manager', 'VPN - Administrator',
    'VPN - Expedite', 'VPN - General', 'VPN - Limited', 'VPN - Supervisor', 'WSS - Administrator', 'WSS - Limited', 'WSS Implementation Manager', 'WSS Maintenance Manager',
    'WSS Planning / Process Manager', 'WSS RFS Agent', 'WSS Technical Support Tire 1', 'WSS Technical Tire 2', 'WSS Trial Team'
  ];
  onlinePriv = this.onlineDropdown[0];
  offLineDropdown = ['Offline User'];
  selectedOffline = this.offLineDropdown[0];

  resourceDrpdwn = ['Billing Inquiry2', 'DSL_PROD_8.0', 'Billing Inquiry2_5.3', 'Billing Inquiry2_5.7', 'Billing Inquiry2_5.8', 'DSL_PROD_4.6', 'DSL_PROD_4.7', 'DSL_PROD_4.8', "DSL_PROD_4.8.1", 'DSL_PROD_4.9',
    'DSL_PROD_5.8', 'DSL_PROD_5.1', 'DSL_PROD_5.2', 'DSL_PROD_5.3', 'DSL_PROD_5.4', 'DSL_PROD_5.5', 'DSL_PROD_5.6', 'DSL_PROD_5.7', 'DSL_PROD_5.8', 'DSL_PROD_5.9', 'DSL_PROD_6.0', 'DSL_PROD_6.1', 'DSL_PROD_6.2', 'DSL_PROD_6.3', 'DSL_PROD_6.6', 'DSL_PROD_6.8',
    'DSL_PROD_6.9', 'DSL_PROD_7.0', 'DSL_PROD_7.1', 'DSL_PROD_7.2', 'DSL_PROD_7.3', 'DSL_PROD_7.4', 'DSL_PROD_7.5', 'DSL_PROD_7.6', 'DSL_PROD_7.7', 'DSL_PROD_7.8', 'DSL_PROD_7.9', 'DSL_PROD_8.0', 'IP_PROD_4.3', 'IP_PROD_4.5',
    'IP_PROD_4.6', 'IP_PROD_4.7', 'IP_PROD_4.8', 'IP_PROD_4.9', 'IP_PROD_5.2', 'IP_PROD_5.3', 'IP_PROD_5.4', 'IP_PROD_5.5', 'IP_PROD_5.6', 'IP_PROD_5.7', 'IP_PROD_5.8', 'IP_PROD_5.9', 'IP_PROD_6.6', 'IP_PROD_6.8', 'IP_PROD_6.9',
    'MIS_PROD_3.2', 'MIS_PROD_3.3', 'MIS_PROD_3.4', 'MIS_PROD_4.0', 'MIS_PROD_4.0.1', 'MIS_PROD_4.2', 'MIS_PROD_4.2.3', 'MIS_PROD_4.3', 'MIS_PROD_4.5', 'MIS_PROD_4.6', 'MIS_PROD_4.7', 'MIS_PROD_4.8', 'MIS_PROD_4.9', 'MIS_PROD_5.0',
    'MIS_PROD_5.1', 'MIS_PROD_5.2', 'MIS_PROD_5.3', 'MIS_PROD_5.4', 'MIS_PROD_5.5', 'MIS_PROD_5.6', 'MIS_PROD_5.7', 'MIS_PROD_5.8', 'MIS_PROD_5.9', 'MIS_PROD_6.0', 'MIS_PROD_6.1', 'MIS_PROD_6.2', 'MIS_PROD_6.3', 'MIS_PROD_6.6', 'MIS_PROD_6.8', 'MIS_PROD_6.9',
    'MIS_PROD_7.0', 'MIS_PROD_6.1', 'MIS_PROD_6.2', 'MOCARS', 'PROD 1.0', 'PROD Modifications', 'PROD_ORG', 'VPN_PROD_3.2', 'VPN_PROD_3.3', 'VPN_PROD_3.4', 'VPN_PROD_4.0', 'VPN_PROD_4.0.1', 'VPN_PROD_4.2', 'VPN_PROD_4.3', 'VPN_PROD_4.5', 'VPN_PROD_4.8', 'VPN_PROD_5.3', 'VPN_PROD_5.7', 'WSS_PROD_3.1', 'WSS_PROD_3.1_Prod', 'WSS_PROD_3.2',
    'WSS_PROD_3.3', 'WSS_PROD_3.4', 'WSS_PROD_4.0', 'WSS_PROD_4.0.1', 'WSS_PROD_4.2', 'WSS_PROD_4.2.2', 'WSS_PROD_4.2.2.1', 'WSS_PROD_4.3.1', 'WSS_PROD_4.5', 'WSS_PROD_4.6', 'WSS_PROD_4.7', 'WSS_PROD_4.8', 'WSS_PROD_5.3', 'resource_config_1.0', ''
  ];
  resourceConfiguration = this.resourceDrpdwn[0];
  supervisorDrop = ['Amit Desai', 'Angela Rizzi', 'Boots Barnett', 'Casandra Ray', 'Casey Chambeau', 'Celeste Carrasco', 'Charles Dunleavy', 'Cliff Kurkowski', 'Daniel Schultheis', 'Debi Guiffre', 'Elycia Norton',
    'Grayson Alexander', 'Henry Carver', 'Jane Wilson', 'Janet Crosser', 'Jim Roberto', 'Joan Carpinello', 'Joe Schutte', 'Josa Tirado', 'Joseph Bard', 'Karrie Darrow', 'Kathy Doyle', 'Kevin Jayawarden', 'Leon Harris',
    'Leslie Talochino', 'Lloyd Culbreath', 'Martha Williams', 'Martha Davis', 'Mary Clippard', 'Michael Murden', 'Micki Shelton', 'Mike Confessore', 'Nilesh Patel', 'Patti McCree', 'Peter Wilson', 'Rahul Patel', 'Raymond Pinder',
    'Robert Klein', 'Robert Carlile', 'Rodney Beasley', 'Roy Horowitz', 'Ryan Pidor', 'Scott Shields', 'Susan Rocco', 'Verna Neal'
  ];
  supervisor = this.supervisorDrop[0];
  workGropDrop = ['Please Specify', 'DSL Account Manager', 'DSL CCA', 'DSL Supervisor', 'DSL Team Lead', 'DSL Tech Support', 'MIS IM', 'MIS Global IM', 'MIS IPT', 'MIS PTS', 'MIS Global PTS', 'MIS Process', 'MIS Supervisor',
    'MIS Order Receip', 'MIS Tech Supporting', 'MIS Auto Detect', 'VPN Provisioning', 'VPN Technical Support', 'VPN Migration'
  ];
  workGroup = this.workGropDrop[0];
  empdetailObjid: string;

  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.initialize();
    this.empRole = this.userInfoService.getEmployeeRole();

  }

  ngAfterViewInit() {
    if (!this.isNew) {
      this.loadEmployeeData();
    } else {
      this.details = {
        "employeeInfo": {}
      }
    }
  }

  loadEmployeeData() {
    this.isLoading = true;
    this.empdetailObjid = this.empDetail.employee;
    console.log('employee Objectid :' + this.empdetailObjid);
    this.empDetailService.getCaseEmpDetailData(this.empdetailObjid).subscribe(data => {
      this.isLoading = false;
      console.log(data);
      this.details = data;
      console.log(this.details);
      if (data == undefined || data == null) {
        this.dialog.openDialog('Unable to retrieve employee details.');
        this.dialogRef.close();
        return;
      }
    }, error => {
      this.isLoading = false;
      this.dialog.openDialog('Unable to retrieve employee details.');
      this.dialogRef.close();
    })
  }


  selectSiteInfo() {
    this.selectSite.open(SelectSiteComponent, {
      width: "80%",
      height: "653px",
      disableClose: true,
      data: { 'fromEmp': true }
    }).afterClosed().subscribe(data => {
      if (data.action == 'use') {
        //set data got from select site screen
        this.details.employeeInfo.siteName = data.siteInfo.siteName;
        this.details.employeeInfo.siteObjId = data.siteInfo.objid;
      } else {
        this.details.employeeInfo.siteName = "";
        this.details.employeeInfo.siteObjId = "";
      }
    })

  }

  sendEmployeeInfo(empData) {
    if (empData.firstName == undefined || empData.firstName == "" ||
      empData.lastName == undefined || empData.lastName == "" ||
      empData.loginName == undefined || empData.loginName == "" ||
      empData.onlinePriv == undefined || empData.onlinePriv == "" ||
      empData.primPhoneNo == undefined || empData.primPhoneNo == "" ||
      empData.email == undefined || empData.email == "" ||
      empData.userAttuid == undefined || empData.userAttuid == "") {
      this.dialogBox.openDialog('Please enter mandatory fields')
      return;
    }
    if (empData.siteName == undefined || empData.siteName == "" ||
      empData.siteObjId == undefined || empData.siteObjId == "") {
      this.dialogBox.openDialog('Please select the site details.');
      return;
    }
    if (empData.objId == null) {
      this.empDetailService.addEmployee(empData).subscribe(data => {
        this.dialogBox.openDialog(data.message);
        this.refreshEmployee();
        this.dialogRef.close();
      }, error => {
        //Failure
      });
    } else {
      this.empDetailService.replaceEmployee(empData).subscribe(data => {
        this.dialogBox.openDialog(data.message);
        this.refreshEmployee();
        this.dialogRef.close();
      }, error => {
      });
    }
  }

  refreshEmployee() {

  }

  addEmployee() {
    let empData: any = {};
    empData = this.details.employeeInfo;
    empData.objId = null;
    this.sendEmployeeInfo(empData);
  }

  replaceEmployee() {
    let empData: any = {};
    empData = this.details.employeeInfo;
    this.sendEmployeeInfo(empData);
  }

  next() {
    this.selectedIndex += 1;
    this.disableNextBtn();
    this.empDetail = Object.create(this.employeeDataList[this.selectedIndex]);
    this.loadEmployeeData();
  }

  prev() {
    this.selectedIndex -= 1;
    this.empDetail = Object.create(this.employeeDataList[this.selectedIndex]);
    this.loadEmployeeData();
    this.disablePrevBtn();
  }

  disableNextBtn() {
    if (this.selectedIndex > 0) {
      this.disablePrev = false;
    }
    if (this.employeeDataList.length > 1) {
      this.disableNext = false;
    }
    //disable next button when no next record;
    if (this.employeeDataList.length == this.selectedIndex + 1) {
      this.disableNext = true;
    }
  }

  disablePrevBtn() {
    if (this.selectedIndex == 0) {
      this.disablePrev = true;
    }
    //disable previous button when no previous record;
    if (this.selectedIndex < this.employeeDataList.length - 1) {
      this.disableNext = false;
    }
  }

  initialize() {
    this.details = {
      "employeeInfo": {}
    }
  }

}







