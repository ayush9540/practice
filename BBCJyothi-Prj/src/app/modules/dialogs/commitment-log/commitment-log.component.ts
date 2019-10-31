import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { LogCommitmentComponent } from '../../dialogs/log-commitment/log-commitment.component';
import { Dialog } from '../../../shared/util/dialog';
import { SelectCommitment } from 'src/app/core/models/selectCommitment';
import { DateTimeDialogComponent } from '../../dialogs/date-time-dialog/date-time-dialog.component';
import { SelectCommitmentService } from '../../../core/services/log-commitment.service';
import { CaseInfo } from 'src/app/core/models/case-info';
import { CaseInfoService } from 'src/app/core/services/case-info.service';



@Component({
  selector: 'bbw-commitment-log',
  templateUrl: './commitment-log.component.html',
  styleUrls: ['./commitment-log.component.css']
})
export class CommitmentLogComponent implements OnInit {


  caseInfo: CaseInfo;

  organizations = [
    'Please Specify', 'ATM (CA)', 'A - Exchange Carrier (EC)', 'B - Customer Care', 'C - Customer', 'D - Front End Center (FEC)',
    'E - Expedite', 'F - Sales/DNAE', 'G - Frame Relay', 'H - Billing', 'I - AT&T', 'J - Planning Team', 'K - IPT', 'L - EasyLink (DNS)',
    'M - Tier 3', 'N - Network Care', 'O - DSL Covad', 'P - Product House (AT&T)', 'Q - Technical Provisioning Document (TPD)',
    'MNS (Managed Router Service)', 'S - Special Study Code', 'T - DSL Customer', 'U - DSL Customer Care', 'V - DSL Facilities',
    'W - DSL ILEC', 'X - System', 'Z - DSL Sales', 'a AVTS', 'd DSL New Edge', 'g GCSC', 'i International', 'n NTS'
  ];
  problemDescriptions = [
    'Please Specify', '01 - FNR-Facility Not Ready', '02 - LNR-Lec Not Ready', '03 - CNR-Short term-CPE issues', '04 - CNR-Long term-CPE issues',
    '05 - CNR (Customer Decision) - Unbilled', '06 - CNR (Customer Unresponsive) - Unbilled', '06 - CNR-Customers Vendor not ready', '07 - CNR (Customer Change)', "08 - CNR (Cutomer's CPE)", '08 - CNR-Change in Service', "09 - CNR - Customer Unresponsive",
    '09 - CNR-Customer Unresponsive ', '10 - Related Order Not Complet', '10 - Related Order Not Complete', '11 - Related Order or Supplement Not Issued/Incorrect',
    '15 - TPD Incorrect/Incomplete', '16 - Contract Incorrect/Incomplete/Missing', '17 - Billing Number Not Supplied to CC', '18 - Lack of Welcome Kit Supplies', '19 - Facility Not Planned or Planned Late', '21 - No Process in Place', '22 - Related Planner Item Not Complete',
    '24 - Router Configuration', '25 - Equipment', '26 - Unable to Meet Design Limits', '27 - IP Address', '33 - Work Force', '35 - Natural Disaster or Work Stoppage', '36 - Government Request', '37 - Not Available in System', '38 - Other', '39 - Prov in Maintenance',
    '40 - Critical Date Not Satisfied', '41 - DNS Order Not Complete', '42 - Frame Relay - Access/Port Not Complete', '45 - Frame Relay Due Date Late',
    "46 - Lack of IP's to Assign", '55 - CNR (Customer Decision) - Billed', '56 - CNR (Customer Unresponsive) - Billed', '57 - CNR (Customer Change) - Billed',
    '58 - CNR (Customer CPE) - Billed', '59 - Network Outage', '60 - Order Type', '61 - Order Speed', '61 - Order Speed', '61 - Order Speed',
    '62 - Service Level', '63 - Contact', '64 - Address/phone issue', '65 - Bad Loop', '66 - Bad order', '67 - Center Delay', '68 - Complete but not accepted',
    '69 - Customer reschedule', '70 - Distance too long', "71 - Doesn't allow access", '72 - Downgrade', '73 - Failed to meet commitment/no show',
    '74 - ILEC capacity', '75 - ILEC no show', '76 - In house wire', '77 - Loop not delivered', '78 - No Continuity', '79 - PVC/Backhaul', '80 - Reschedule install', '81 - System/Tool Unavailable', '82 - Test and turn up ok/Bad CPE equip', '96 - Methods and Procedures Not Available',
    '97 - Planner', '99 - Not Applicable/Disregard', 'AT&T Facility Problems', 'Busy TDI', 'C - Address Incorrect', 'C - Changed Mind', 'C - Duplicate Order',
    'Complt Lt - Missed', 'Complt Lt - Workload', 'Customer has existing Acct.#', 'DSX FIC not in Inventory', 'GAR Problems', 'I/M Account Team Info',
    'I/M Customer Info', 'Improperly Provisioned', 'Invalid Address', 'Invalid CLLI Code', 'Invalid LCON', 'Invalid LSO', 'Invalid MCN', 'Invalid TDI',
    'Invalid or Missing AAV code', 'LEC Facility Problems', 'MDS/Contract Conflict', 'MIS', 'No GAR Capacity', 'No PVC', 'Order Rejected', 'Order Rejected - CC',
    'Order Rejected - Customer', 'Order Rejected - Sales', 'Order not in SOTS'
  ];
  locationInformations = [
    'Please Specify', 'AMNQ', 'AOTS', 'ASOC', 'B2BI GATEWAY', 'BBCATS', 'BBNMS-LS', 'BRASS', 'CANOPI', 'CLARIFY', 'CMS EMS',
    'CPSOS', 'CSI - Adapter', 'CSI - Credit and Val', 'CSI - Network Management', 'CSI - Order and Subscription', 'CSI -Trouble Management',
    'CSI - Work Force', 'EDGE', 'ERP-EPIC', 'FORCE', 'G2', 'GIOM', 'INSTAR', 'LS ACS', 'LS CRM', 'LS EPC', 'LS OMS', 'OVALS NSP', 'PED', 'PMOSS',
    'QIP', 'RUBY', 'SBC SS', 'WFA/C', 'AOW/AISE', 'A - SOTS', 'B - TIRKS', 'C - NIPA', 'D - IPAT', 'G - UAT', 'J - Server', 'M - AGA Tool',
    'O - Other', 'P - Clarify', 'Q - CC Agent', 'R - Web Site', 'S - ATT mail/BMDmail', 'T - Arbor', 'U - Brass', 'V - Covad site', 'W - DSL Tool',
    'X - E-mail', 'Z - Not Applicable'
  ];
  informationStatus = ['Please Specify', '1 - Missing/Defective', '2 - Incorrect/Other'];
  taskWorkable = ['Please Specify', '1 - Workable', '2 - Non-Workable'];
  titles = [
    'Please Specify', '1-DNS From to ELS', '1- SNRC/AR from IP Tool', '1- Validate Circuit USOs Compltd', '2- Status Call to Customer', '2- TDI Assignment Complet',
    '2- TQ Back to IM', 'ACCA Completed', 'Access/Port Accepted/USO in SOTS', 'Access/Port Ordered/USO Issued', "Access/Port Orders Rec'd from PTE",
    'Access/Port Orders to AOW Team', 'Access/Port Ready', 'Accunet Acceptance', 'Added UsageBased Billg-IPDepot', 'ASR Issued', 'Assign Case to IM',
    'Assign LAN, WAN, IP and PVC', 'ATM AOW Subcase Closed/Dispatched Back to PTE', 'AT&T Confirm call to customer', 'AT&T Rdy - Basic', 'AT&T Rdy - Plus',
    'AT&T Rdy Confirm Basic', 'AT&T Rdy Confirm Plus', 'AT&T Ready', 'AT&t Ready - Basic', 'AT&T Ready - Change', "Burstable Billing Subcse Rec'd Back fr Billing",
    'Capacity Reservation', 'Capacity Validation', 'Case Accepted', 'Case Assigned', 'Case Opened', 'Case Re-reviewed', 'Case  Rejected', 'Case to Router Config PTE',
    'Case Verified', 'CCD Received', 'CCD Sent', 'Check Order in USRP & Send', 'Check RCD/TOD', 'Chk if cust has eml add (CLEC)', 'Chk if cust has eml add (FOC)',
    'Chk if cust has eml add (ILEC)', 'Chk if cust reqstd DNS(submit)', 'Chk if cust reqstd email(send)', 'CIP Installation Complete', 'Circ Migration/DNS Complt',
    'Clear Port Asgnmnts-NC if Hcap', 'CLEC Install Complete', 'Close Case', 'CNR Acknowledgement Date', 'CNR Billing Date', 'Comm IP Info with Customer',
    'Config 1 retn from Concert-UK', 'Config 1 to Concert-UK', 'Config 2 to Concert-Atlanta', 'Config2 retn from Concert-Atl', 'Configure DNS', 'Configure Radius Server',
    'Configure Redback', 'Confirm install dates with CLEC', 'Confirm Install dates with customer', 'Confirm T&T- Anixter', 'Contract Fully Approved', 'Contract Received',
    'Contract Summary Rcv', 'CPE On-Site & Config', 'CPE Shipped', 'Create Billing Subcase', 'Create Flash in Clarify', 'Credit Approved', 'Credit Fully Approved',
    'Credit Rejected', 'Credit Review Complt', 'CTA Complete', 'Cust Confirm Call', 'Customer PBX Ready', 'Customer Readiness Call', 'Customer Ready', "Customer's Renumbering Complt",
    'Customer Research Completed', 'Date Confirm Anixter', 'Date Confirm to DNAE', 'Date Service Complet', 'Disconnect Complete', 'Discuss Transition Dt with MNS',
    'Discuss Transition Date WIth MNS Consultant', 'Dispatch Billing Subcase', 'Dispatch Burstable Billing Subcase', 'Dispatch DNS Subcase', 'Dispatch MTS Subcase',
    'Dispatch NTQ to Cust', 'Dispatch Provisioned Billing Subcase', 'Dispatch TQ Review Subcase', 'DNS Complete', 'DNS Form Complete', 'DNS Form to ELS', 'DNS Info into SOF',
    'DNS InterNic Templt InterNic', 'DNS InterNic Templt to Cust', 'DNS Name Server Updated', 'DNS Testing', 'DSL Provisioning Complete', 'DVA Complete', 'Effective Billing Dt',
    'Entered Data into VANSSwebTool', "EOL Rec'd", 'Equip Vendor Acceptance', 'Equipment Received', 'Equipment Shipped', "Equipmnt Rec'd Verification Call to Csr",
    'Equipmnt Shipped Verification Call to Csr', 'Equipmnt Vendor Arrives On-Site', 'Equipmnt Vendor Completes Installatn', 'Equipmnt Vendor Installatn CPE',
    'Estimated Due Date Quoted', 'Expect Set/SchedT&Tto Csr ', 'Firm Due Date Confirmation Letter Sent', 'Firm Due Date Quoted', 'Flash Created', "FOC Rec'd", 'GAR Port Reserved',
    'GCSC Turn-Up', "GCSC MFWS Implementat'n Done", 'Get CPE List & Return Adr', 'Get LAN Addr & Mask', "HW Feature Implementat'n Done", 'Identify IP Address & Move',
    'If Cut Order Dim Cancel', 'If Not Cut Together,Notifi NC', 'If Reactivate:NC/MTS & Close', 'If Reactivate:NC/MNS/MTS & Cancel', 'ILEC Install Confirm', 'IM Call to Cust',
    'IM call to customer', 'IM Start', 'Implementation Call Customer', 'Inform Cust WAN Addr', 'Inform DNAE CPE Shpd', 'Initiate PROV Hold', 'Initiate TQ Validate w. Cust',
    'Initiate TQ Validation w. Cust', 'Install Kit Shipped', 'IP Addr Mapping Call Complete', 'IP Addr Recd from Concert-Atl', 'IP Address List to PTS', 'IP Addresses Advertised by BBN',
    'IP Block Assigned', 'IP Connectivity Test', 'IP Connectivity Test (Ping)', 'IP Retrieval', 'IPT USO Complete', 'IP Validation', 'Issue Hard Disco Req in EFMS',
    'Issue Hard Disconnect Request', 'LAN IP Block Assigned', 'Logical CCD Received', 'Logical CCD Sent', 'Mail the Welcome Kit', 'Milestn Recd from Concert-Atl', 'MDS Received',
    'MFWS Implementation Begins', 'MFWS Implementation Completed', 'MIS Ready', 'MNS Acceptance & SE Assigned', "MNS Documents Rec'd", 'Modified NIPA for BurstblBillg',
    'MTS Accpt Testing', 'MTS Complete Accept', 'NC Acceptance', 'NC Accepts Order', 'NC DD Complete', 'NC RID Completed', 'NC Turns Ckt to CC', 'NC Work Completed',
    'Negotiate install dates with customer', 'Network Care Turns Circiut CC', 'NIPA & IP Depot Port Deleted', 'Notifi BBN,Site Patrol Transt', 'Notifi MTS support transt Cust',
    'Notification to DNAE', 'Notify APMC with SINA Ckt Info', 'Notify BBN Site Patrol Cancell', 'Notify DNAE transition date', 'Notify Dragon for DNS Disco', 'Notify Mgt Site Patrol Cancel',
    'Notify PIM of T&T Date', 'Notify PIM T&T Complete', 'Obtain IP & PVC Information', 'OCC Completed', 'Old/Updated SOF & TPD to MNS', 'Old/Updated TQ to MNS',
    'Ord Package to MTS', 'Order Assigned', 'Order Pkg to MTS (Migration)', 'Order to EquipVendor', 'Order to GSCM', 'Orders in SOTS', 'Place Order with CLEC', 'Pre-Cut Call Completed',
    'Pre-Transition Call Completed', 'ProgressCall to Cust', "Project Schedule Rec'd", 'Provisioning Complete', 'Provisioning Completion Notifi', 'PVC Order Accepted/USO in SOTS',
    "PVC Order Rec'd from PTE", 'PVC Ordered/USO Issued', 'PVC Orders to AOW Team', 'PVC Ready', 'Ran Successful Test Scan', 'Ran Test Scan', 'RCD/CTA/DD Complete',
    'Receive CLEC Customer Install Date from CLEC', 'Receive CLEC Install Dates', 'Receive IBR Info from APMC', 'Receive ILEC FOC date from CLEC', 'Receive ILEC FOC Dates fm CLEC',
    'Receive ILEC Install Confirm', 'Receive Order # and Circuit #', 'Receive SDP From AMS & CE', 'Reconfirm Transition with Cust', 'Release DNS Order', 'Release Facility Order to IPT',
    'Release Order to NC', 'Renumbering Completed', 'Renumbering Date from Customer', 'Resource Kit to Cust', 'Restoral', 'Restoral', 'Revise TQ to Tier 3', 'Revised TQ Accepted from NC',
    'Revised TQ Acptd Fr Equip Vendor', 'Revised TQ to Equip Vendor', 'Revised TQ to GCSC', 'Revised TQ to MNS', 'Revised TQ to NC', 'RID Complete', 'Router Config File to NC',
    'Router Config Text DOc from MNS', 'Router Config,Text Doc MNS', 'Router Info From RMC', 'Router Name/IP in NC NMS Web', 'Sched. Renumber w/Cust', 'Schedule Migration',
    'Schedule On-Site T&T', 'Schedule Test&Turnup', 'Schedule TQ Review', 'Schedule Transition', 'Security Policy Call Completed', 'Send customer the IP address information',
    'Send Data to Clarify', 'Send Email to AMS & CE for RMA', 'Send Logical Data to Clarify', 'Send Logical SOF to Clarify', 'Send MDS to Mail Vendor', 'Send Order to ELS',
    'Send Order to Equip Vendor', 'Send Order to HSPS', 'Send Order to IPT', 'Send Order to NC', 'Send Order to SLZ', 'Send reg request to InterNIC or contact customer for zone transfer',
    'Send TID to Customer', 'Send TID with NTS Instruction Doc to Customer', 'Send Router Config File to NC', 'Service Completion Verification Call to Csr', 'Setup Bridge Call',
    'Site Patrol Transitioned MFWS', 'Site Patrol Transitioned to MFWS', 'Site Survey Completed', 'Site Survey Completion Verification Call to Csr', 'SNRC/AR from IP Tool',
    'SNRC/AR from SOTS', 'SOF, TPD & PSD to MNS', 'SOF/TQ&TPD Dates Notifi GCSC', 'SOF/TQ&TPD Dates Notifi MNS', 'SOF/TQ & TPD to PTS', 'SOF/TQ & TPD to Tier 3', 'SOF/TQ Received',
    'SOF/TQ to Accunet', 'SOF/TQ to C&C', 'SOF/TQ to Equip Vendor', 'SOF/TQ to MNS', 'SOF/TQ to NC', 'SOF/TQ to NC for Reference', 'SOF/TQ to PTS', 'SOF/TQ to Tier 3',
    "SOF-Subcase Rev'd and Accptd", 'SOF-Subcase Reviewed', 'SOF- Accepted', 'SOF-Subcase Reviewed and Accepted', 'SOF &TPD to MNS', 'SOF C&C Complete', 'SOF validate w DNAE',
    'SOF Validate w. Cust', 'Soft Disco Initiated in INSTAR', 'Soft Disconnect Rqst to NC/MTS', "Start GCSC MFWS Implementat'n", "Start HW Feature Implementat'n",
    "Start SW Feature Implementat'n", 'Status, Sched T&T with Csr', 'Status Call to Customer', 'Status Cust', 'Status Partner', 'Subcase to IM', 'Subcase to PTE', 'Submit Order to BRASS',
    'Supp acknowledged by IPT', 'Supp sent to IPT', "SW Feature Implementat'n Done", 'T&T Confirm. Call to Cust', 'TDI Assignment Compltd', 'Tele-Install Review', 'Test & Turnup Complete',
    'Test & Turnup Conf. Call to GCSC', 'Test & Turnup Conf. Call to NCR', 'Test & Turnup Conf. Call to SLZ', 'TFAS Complete', 'TFAS Issued', 'TQ Back to IM', 'TQ Review Call E-mail to MNS',
    'TQ Review Call E-Mail to MNS', 'TQ Review Complete', 'TQ Review w. Cust', 'TQ Reviewed', 'TQ Subcase Back to PTE', 'TQ Subcase to IM', 'TQ Subcase to PTE', 'TQ to MTS',
    'TQ Validated with Customer and MNS', 'TQ-Subcase Reviewed', 'Transition to MFWS Completed', 'Update SOF/TQ to MNS', 'Usage Prov. Complete', 'USOs Issued', 'Validate Circuit USOs Compltd',
    'Validate Circuit USOs Status', 'Validate Equipment Received', 'Validate Equipment Shipped', 'Validate Install and Test and Turn up is completed', 'Validate IP Resource Recovery',
    'Validate Port in Soft Disco', 'Validate RCD Compltd', 'Validate Supplier Order Status', 'Validate TDD Compltd', 'Validate Tranport Complt Date', 'Validate Transport Complt Date',
    'Verify CSR Completed X-Connect', 'Verify Site Qualification with DSL provider', 'VISP Provisioning Complete', 'VoIP Ready', 'VPN Provisioning Complete', 'WAN IP Assignment',
    'Welcome Call to Cust', 'Welcome Call to the customer', 'Welcome E-mail sent to CSR', 'Yank Case from Hard Disco Q', 'Hard Disco Initiated in INSTAR', 'Soft Disco Initiated in MOCARS',
    'Hard Disco Initiated in MOCARS', 'Remove Router Interface&Config', 'Soft Disconnect Rqst', 'If Reactivate - Mocars/MTS & Can', 'USO (S) Complete', 'Remove Router Interface & Config',
    'Received RMA', 'Dispatch Subcase to ORG', 'Recieved Subcase from ORG', 'Dispatch Subcase to IP team', 'Update INSTAR', 'Line Verified by DSL Provider', 'Place Order with DSL Provider',
    'Rec DSL Provider Install Dates', 'DSL Provider Install Complete', 'Order Received by HSIA ', 'Chk Customer Reqstd DNS Submit', 'Rcv HSIA Order#,Ckt#,UBAN,PVC',
    'Receive IP info from HSIA', 'Comm IP Info to Customer', 'Receive HSIA FOC Date', 'Receive HSIA PRO Install Date', 'HSIA FOC Date Complete', 'HSIA PRO Install Complete',
    'Receive IPAG Network Detail', 'IPAG Provisioning Complete'
  ]

  jepCodes = [''];
  jepCode: string = "";
  title: string = "";
  objid: string = "";
  schedCmpltime: string = "";

  organizationSelected: any = this.organizations[0];
  problemDescriptSelected: any = this.problemDescriptions[0];
  locationInfoSelected: any = this.locationInformations[0];
  infoStatusSelected: any = this.informationStatus[0];
  taskWorkSelected: any = this.taskWorkable[0];

  selectedIndex: number;
  enterCommitment: string = "";
  selectedAct: any = {
    "xJeopardy": this.organizations[0],
    "xJeopardy2": this.problemDescriptions[0],
    "xJeopardy3": this.locationInformations[0],
    "xJeopardy4": this.informationStatus[0],
    "xJeopardy1_5": this.taskWorkable[0],
    "condition": "",
  };
  selectCommitment: SelectCommitment[] = [];

  isNew: boolean = false;

  constructor(public dialogRef: MatDialogRef<CommitmentLogComponent>,
    public fullFillDate: MatDialog,
    private dialogBox: Dialog, private caseInfoService: CaseInfoService,
    private commitmentService: SelectCommitmentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedIndex = data.selectedIndex;
    this.selectCommitment = data.logData;
    this.isNew = data.isNew;

    if (this.selectedIndex != -1) {
      this.selectedAct = Object.create(this.selectCommitment[this.selectedIndex]);
      this.setLocals();
    }
    else {
      this.initialize();
    }
    this.disableNextBtn();
    this.disablePrevBtn();
  }

  showDialog(msg) {
    this.dialogBox.openDialog(msg);
  }


  ngOnInit() {
    this.setJeoValues();
    this.caseInfo = this.caseInfoService.getSelectedCaseInfo();
  }
  setJeoValues() {
    if (this.selectedAct.xJepSum3 == null) {
      this.jepCode = "";
    } else {
      this.jepCode = this.selectedAct.xJepSum3;
    }
    if (this.selectedAct.xJeopardy == undefined)
      this.selectedAct.xJeopardy = this.organizations[0];
    if (this.selectedAct.xJeopardy2 == undefined)
      this.selectedAct.xJeopardy2 = this.problemDescriptions[0];
    if (this.selectedAct.xJeopardy3 == undefined)
      this.selectedAct.xJeopardy3 = this.locationInformations[0];
    if (this.selectedAct.xJeopardy4 == undefined)
      this.selectedAct.xJeopardy4 = this.informationStatus[0];
    if (this.selectedAct.xJeopardy1_5 == undefined)
      this.selectedAct.xJeopardy1_5 = this.taskWorkable[0];
  }

  initialize() {
    this.selectedAct = {
      "xJeopardy": this.organizations[0],
      "xJeopardy2": this.problemDescriptions[0],
      "xJeopardy3": this.locationInformations[0],
      "xJeopardy4": this.informationStatus[0],
      "xJeopardy1_5": this.taskWorkable[0],
      "schedCmpltime": null,
      "title": this.titles[0],
      "condition": ""
    };
  }

  changeValue(value) {
    this.jepCode = "";
    let jep = "";
    if (this.selectedAct.xJeopardy == this.organizations[0]
      || this.selectedAct.xJeopardy2 == this.organizations[0]
      || this.selectedAct.xJeopardy3 == this.organizations[0]
      || this.selectedAct.xJeopardy4 == this.organizations[0]
      || this.selectedAct.xJeopardy1_5 == this.organizations[0]) {
      return;
    }
    jep += this.selectedAct.xJeopardy.charAt(0);
    jep += this.selectedAct.xJeopardy2.substring(0, 2);
    jep += this.selectedAct.xJeopardy3.charAt(0);
    jep += this.selectedAct.xJeopardy4.charAt(0);
    jep += this.selectedAct.xJeopardy1_5.charAt(0);
    this.jepCode = jep;
    this.selectedAct.xJepSum3 = this.jepCode;
  }

  disablePrev: boolean = true;
  disableNext: boolean = true;


  next() {
    this.selectedIndex += 1;
    this.disableNextBtn();
    this.selectedAct = Object.create(this.selectCommitment[this.selectedIndex]);
    this.setLocals();
    this.setJeoValues();

  }

  prev() {
    this.selectedIndex -= 1;
    this.selectedAct = Object.create(this.selectCommitment[this.selectedIndex]);
    this.setLocals();
    this.disablePrevBtn();
    this.setJeoValues();
  }

  setLocals() {
    this.title = this.selectedAct.title;
    this.objid = this.selectedAct.objid;
    this.schedCmpltime = this.selectedAct.schedCmpltime;
  }

  disableNextBtn() {
    if (this.selectedIndex > 0) {
      this.disablePrev = false;
    }
    if (this.selectCommitment.length > 1) {
      this.disableNext = false;
    }
    //disable next button when no next record;
    if (this.selectCommitment.length == this.selectedIndex + 1) {
      this.disableNext = true;
    }
  }
  disablePrevBtn() {
    if (this.selectedIndex == 0) {
      this.disablePrev = true;
    }
    //disable previous button when no previous record;
    if (this.selectedIndex < this.selectCommitment.length - 1) {
      this.disableNext = false;
    }
  }
  validate() {
    if (this.jepCode == null || this.jepCode == "") {
      this.showDialog("You must specify a reason for the date change. ");
      return false;
    } else {
      return true;
    }
  }


  setCommitData() {
    if (this.selectedIndex != -1) {
      this.selectedAct.title = this.title;
      this.selectedAct.objid = this.objid;
      this.selectedAct.schedCmpltime = this.schedCmpltime;
    }
    this.selectedAct.xJeopardy = this.selectedAct.xJeopardy + '';
    this.selectedAct.xJeopardy2 = this.selectedAct.xJeopardy2 + '';
    this.selectedAct.xJeopardy3 = this.selectedAct.xJeopardy3 + '';
    this.selectedAct.xJeopardy4 = this.selectedAct.xJeopardy4 + '';
    this.selectedAct.xJeopardy1_5 = this.selectedAct.xJeopardy1_5 + '';
    this.selectedAct.condition = this.selectedAct.condition + '';
    this.selectedAct.cmitHistory = this.enterCommitment;
    this.selectedAct.xJepSum3 = this.jepCode;
  }

  fullFillBtn() {
    if (!this.validate()) {
      return;
    }

    this.setCommitData();

    this.commitmentService.fullfillTransactionFromCommitment(
      this.caseInfo.caseId,
      this.caseInfo.tableCase.objid,
      this.caseInfo.tableUser.objid,
      this.selectedAct,
      this.caseInfo.tableUser.loginName,
      this.caseInfo.tableContact.firstName,
      this.caseInfo.tableContact.lastName,
      this.caseInfo.tableContact.objid).subscribe(data => {
        console.log(`data :::${data}`);
        this.dialogRef.close('Yes');
      }, error => {
        this.dialogRef.close('No');
      });

  }

  make() {
    if (!this.validate()) {
      return;
    }
    if (this.isNew) {
      if (this.selectedAct.title == undefined || this.selectedAct.title == this.titles[0]) {
        this.showDialog("Please select title.");
        return;
      }
      if (this.selectedAct.schedCmpltime == undefined || this.selectedAct.schedCmpltime == "") {
        this.showDialog("Please enter commit date.");
        return;
      }
    }
    //Missing title...
    this.setCommitData();

    this.commitmentService
      .makeCommitment(
        this.caseInfo.caseId,
        this.caseInfo.tableCase.objid,
        this.caseInfo.tableUser.objid,
        this.selectedAct,
        this.caseInfo.tableUser.loginName,
        this.caseInfo.tableContact.firstName,
        this.caseInfo.tableContact.lastName,
        this.caseInfo.tableContact.objid
      )
      .subscribe(data => {
        console.log(`data :::${data}`);
        //this.selectedAct.cmitHistory = data.commitLog;
        this.dialogRef.close('Yes');
      }, error => {
        this.dialogRef.close('No');
      })
  }

  dateTimeChange() {
    this.fullFillDate.open(DateTimeDialogComponent, {
      disableClose: true,
      data: this.selectedAct.schedCmpltime

    }).afterClosed().subscribe(data => {
      if (data.action == 'Yes') {
        this.schedCmpltime = this.selectedAct.schedCmpltime = data.fullFillDate;
      }
    })
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

}
