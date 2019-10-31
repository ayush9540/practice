import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CaseInfoService } from '../../../core/services/case-info.service';
import { CaseInfo } from '../../../core/models/case-info';
import { UserInfoService } from 'src/app/core/services/user-info.service';

@Component({
  selector: 'bbw-more-info-dialog',
  templateUrl: './more-info-dialog.component.html',
  styleUrls: ['./more-info-dialog.component.css']
})
export class MoreInfoDialogComponent implements OnInit {

  isNew: boolean = false;
  caseInfo: CaseInfo
  details: any;
  empRole:any;
  constructor(public dialogRef: MatDialogRef<MoreInfoDialogComponent>, private userInfoService: UserInfoService,public caseInfoService: CaseInfoService) { }

  //If the dropdown value not present in code and a new dropdown 
  //value comes from backend then add the dropdown value to options
  addOptionIfNotPresent() {
    this.custQualifiers.push(this.details.tableSite.xcustSubtype);
    this.origins.push(this.details.tableCase.xorigin);
    this.custPremises.push(this.details.tableSite.premisesLocation);
    this.serviceIndicators.push(this.details.tableCase.xserviceIndicator);
    this.salesOffers.push(this.details.tableSof.salesOffer);
  }

  ngOnInit() {
    this.details = this.caseInfoService.getSelectedCaseInfo();
    // console.log(this.details.tableCase.xProjectNum);
    this.addOptionIfNotPresent();
   this.empRole=this.userInfoService.getEmployeeRole();
  }

  closeDialog(): void {
    this.dialogRef.close({ 'caseData': this.details });
  }

  serviceIndicators = ["VPN", "WSS", "DSL"];
  salesOffers = ["DSL", "AVTS", "Please Specify"];
  custQualifiers = [
    ".com",
    "Concert",
    "Domestic",
    "DSP",
    "Government",
    "GV Resale",
    "International",
    "ISP",
    "Internal",
    "MARO",
    "NTS Carrier",
    "NTS Hosting",
    "Regular Corporate",
    "Re-Marketer",
    "Reseller Direct",
    "VAR/Agent",
    "Wholesale",
    "WH End User",
    "N/A",
    ""
  ];
  origins = [
    "Please Specify",
    "CCOM",
    "Customer",
    "DSL BRS",
    "DSL CSM",
    "DSL MDS",
    "DSL On-Line",
    "EasyLink",
    "Email",
    "E-Order",
    "Fax",
    "Letter",
    "Line-Split Requested",
    "MIS Provisioning",
    "MNS",
    "NetSolve",
    "Network Care",
    "Other",
    "Phone",
    "VISP Partner Request",
    "VISP_Partner",
    "VISP End User Request",
    "VISP_end_user",
    "Web MIS SOF",
    "World Wide Web",
    "Website Services(EW3)",
    "Web LCM site",
    "Web WSS SOF"
  ];
  custPremises = ["Domestic"];

  priorityAndSeverity = [
    "Please Specify",
    "0 - Critical",
    "1 - High",
    "2 - Medium",
    "3 - Low",
    "4 - No Rush"
  ];

}
