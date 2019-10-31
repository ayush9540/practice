import { IpLetterAdmin } from '../../../core/models/ip-letter-admin';
import { IpLetterTemplate } from '../../../core/models/ip-letter-admin';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IpLetterAdminService } from '../../../core/services/ip-letter-admin.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Dialog } from 'src/app/shared/util/dialog';

@Component({
  selector: 'bbw-ip-letter-admin',
  templateUrl: './ip-letter-admin.component.html',
  styleUrls: ['./ip-letter-admin.component.css']
})
export class IpLetterAdminComponent implements OnInit {

  statusDropdown = ["All", "Test", "Production", "Archive"]
  selectDrop = ["Test", "Production", "Archive"];
  selectedDropdownType = ["All", "Activate IP", "Multi User Pro Install", "Multi-User Pro Install - BellSout",
    "Multi-User Self Install - BellSout", "Pro Install BYO CPE", "Pro Install BYO CPE - BellSout",
    "Reserve IP", "SU Pro Install", "SU144k Pro Install", "SU144k Pro Install BYO CPE", "US Self Install",
    "US Static IP Pro Install", "US Static IP Pro Install BYO", "US Static IP Self Install", "US Premum Self Install",
    "SU Network Config Static", "SU Network Config DHCP", "cS Professional Install", "cS Self Install", "cS VISP Professional Install",
    "cS VISP Self Install", "cS IP Address change", "HSIA Multiuser Static", "HSIA Single User Dynamic", "HSIA Activate IP",
    "eFBS HSIA Multiuser Status", "eFBS HSIA Singleuser Dynamic", "eFBS HSIA Activate IP", "CPE LEASE MIGRATION LET",
    "FMO Activate IP", "FMO Multi User Pro Install", "FMO Reserve Ip", "FMO Switch Letter"]
  statusValue: any = this.statusDropdown[0];
  typeValue: any = this.selectedDropdownType[0];
  selected: any;
  firstFilterResult: any;
  isLoading: boolean = false;



  iplBodycontent: string = "";

  displayedColumns: string[] = ['type', 'version', 'status', 'last', 'empFname', 'empLname'];
  insertDataSelection: any;

  constructor(private _ipLetterAdminService: IpLetterAdminService,
    public dialogRef: MatDialogRef<IpLetterAdminComponent>,
    public dialog: MatDialog,
    public dialogBox: Dialog,

  ) {
    this.selected = this.ipletterAdmin;
  }

  subject: string = "";
  public ipletterAdmin: IpLetterAdmin[] = [];
  selectedIpLetterAdmin: IpLetterAdmin = null;
  ipLetterTemplate: IpLetterTemplate;
  selectedIpLetterAdmin2: string;
  selectedIpLetterAdmin3: string;
  selectedIpLetterAdmin4: string;
  selectedIpLetterAdmin5: string;
  selectedIpLetterAdmin6: string;
  selectedIpLetterAdmin7: string;
  isTestStatusIpLetterVersion: boolean = true;


  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.ccList = "";
    this.resetData();
    this.loadInitialData();
  }

  loadInitialData() {
    this.isLoading = true;
    this.resetData();
    this._ipLetterAdminService.getIpLetterAdminData().subscribe(data => {
      this.ipletterAdmin = this.dataSource.data = data;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  selectedServerInfo = {
    "revisionStatus": "Test",
  }


  addTextAtCaret(oField, text) {
    var cursorPosition = oField.selectionStart;
    this.addTextAtCursorPosition(oField, cursorPosition, text);
    this.updateCursorPosition(cursorPosition, text, oField);
  }
  addTextAtCursorPosition(textArea, cursorPosition, text) {
    var front = (textArea.value).substring(0, cursorPosition);
    var back = (textArea.value).substring(cursorPosition, textArea.value.length);
    textArea.value = front + text + back;
  }
  updateCursorPosition(cursorPosition, text, textArea) {
    cursorPosition = cursorPosition + text.length;
    textArea.selectionStart = cursorPosition;
    textArea.selectionEnd = cursorPosition;
    textArea.focus();
  }
  templateExampleContent = "";
  iplBodycontentTemp = "";
  ccList = "";
  toList = "";

  createTemplateExampleContent(iplBodyTextArea) {
    this.subject = this.selectedIpLetterAdmin.letterType + ' [Status: ' + this.selectedIpLetterAdmin.revisionStatus + ']';
    if (!iplBodyTextArea) {
      this.templateExampleContent = this.ipLetterTemplate.iplBody.content;
    } else {
      this.templateExampleContent = iplBodyTextArea.value;
    }
    let tags = this.ipLetterTemplate.iplTags;
    for (var i = 0; i < tags.length; i++) {
      this.templateExampleContent = this.templateExampleContent.split(tags[i].name).join(tags[i].tagExample);
    }
  }

  setClickedRow(row, iplBodyTextArea) {
    this.resetData();
    this.selectedIpLetterAdmin = row;
    this.selectedIpLetterAdmin2 = row.revisionVersion;
    console.log(row.revisionStatus);
    if (row.revisionStatus == 'Test') {
      this.isTestStatusIpLetterVersion = true;
    } else {
      this.isTestStatusIpLetterVersion = false;
    }
    this.selectedIpLetterAdmin3 = row.employeeFirst + "  " + row.employeeLast;
    this.selectedIpLetterAdmin4 = row.letterType;
    this.selectedIpLetterAdmin5 = row.revisionDate;
    this.selectedIpLetterAdmin6 = row.letterDesc;
    this._ipLetterAdminService.getIpLetterTemplateData(this.selectedIpLetterAdmin.objid, this.selectedIpLetterAdmin.letterType).subscribe(data => {
      this.ipLetterTemplate = data;
      this.iplBodycontent = this.ipLetterTemplate.iplBody.content;
      this.iplBodycontentTemp = this.ipLetterTemplate.iplBody.content;
      this.insertDataSelection = this.ipLetterTemplate.iplTags[0].name;
      this.createTemplateExampleContent(iplBodyTextArea);
    })
  }

  resetData() {
    this.ipLetterTemplate = {
      "iplBody": {
        "content": ""
      },
      "iplTags": [
        {
          "name": "",
          "letterType": "",
          "tagExample": ""
        }
      ]
    };
    this.iplBodycontent = "";
    this.iplBodycontentTemp = "";
    this.templateExampleContent = "";
    this.selectedIpLetterAdmin2 = "";
    this.selectedIpLetterAdmin3 = "";
    this.selectedIpLetterAdmin4 = "";
    this.selectedIpLetterAdmin5 = "";
    this.selectedIpLetterAdmin6 = "";
  }
  saveTemplateData(iplBodyTextArea) {
    this.iplBodycontent = iplBodyTextArea.value;
    this.confirmUserAction('Are you sure, you want to Save the changes?').afterClosed().subscribe(action => {
      if (action == 'Yes') {
        console.log('Yes selected ....');
        this._ipLetterAdminService.saveIpLetterAdminData(
          this.selectedIpLetterAdmin.objid,
          this.selectedIpLetterAdmin.employeeObjid,
          this.iplBodycontent
        ).subscribe(data => {
          this.loadInitialData();
          console.log('Handle success scenerio');
        },
          error => {
            console.log('Handle failure scenerio');
          }
        );
      } else {
        console.log('No selected ....');
        //Do nothing
      }
    })
  }


  confirmUserAction(message) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: message
    });
  }

  deleteTemplateData() {

    this.confirmUserAction('Do you want to delete this version of the Letter?').afterClosed().subscribe(action => {
      if (action == 'Yes') {
        console.log('Yes selected ....');
        this._ipLetterAdminService.deleteIpLetterAdminData(
          this.selectedIpLetterAdmin.objid,
          this.selectedIpLetterAdmin.letterObjid
        ).subscribe(data => {
          this.loadInitialData();
          console.log('Handle success scenerio');
        },
          error => {
            console.log('Handle failure scenerio');
          }
        );
      } else {
        console.log('No selected ....');
        //Do nothing
      }
    })
  }

  cancel(iplBodyTextArea) {
    //reset the content modified by user
    iplBodyTextArea.value = this.iplBodycontentTemp;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  sendMail() {
    let ipMail: any = {};
    if (this.subject == null) {
      console.log('No subject line');
    }
    ipMail.subject = this.subject;
    if (this.toList == null || this.toList == undefined || this.toList.length < 2) {
      this.dialogBox.openDialog("Please enter 'Send To' Email Id(s)");
      return;
    }
    ipMail.ccList = this.getAddressList(this.ccList);
    ipMail.toList = this.getAddressList(this.toList);
    if (this.validateAddresses(ipMail.ccList) && this.validateAddresses(ipMail.toList)) {
      this.dialogBox.openDialog("Unsupported format in <Send To> / <CC List> mail ID(s), please update and resend.");
      return;
    }
    ipMail.message = this.templateExampleContent;
    this._ipLetterAdminService.sendMail(ipMail).subscribe(data => {
      let resp: any = data;
      if (resp.status == "SUCCESS") {
        console.log('Email sent successfully.');
        this.dialogBox.openDialog("Email sent successfully.");
      } else {
        this.dialogBox.openDialog("Unable to reach the recipient(s)");
        console.log('Mail not sent successfully.');
      }
    }, error => {
      console.log('mail not sent.');
    }
    );

  }

  validateAddresses(addresses: string) {
    let invalid = true;
    if (addresses == null || addresses.length < 1) {
      return invalid;
    }
    try {
      for (let i = 0; i < addresses.length; i++) {
        if ((addresses[i].trim().indexOf('@') == -1 || addresses[i].trim().indexOf(' ') != -1)) {
          console.log('one of email address is not proper');
          return invalid;
        }
      }
    }
    catch (err) {
      return invalid;
    }
    return !invalid;
  }

  getAddressList(addresses) {
    if (addresses == null || addresses.length < 1) {
      return [];
    }
    return addresses.split(',');
  }


}














