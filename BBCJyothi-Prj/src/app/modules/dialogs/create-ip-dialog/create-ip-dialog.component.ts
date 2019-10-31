import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { CreateIpLetterService } from '../../../core/services/create-ip-letter.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Dialog } from '../../../shared/util/dialog';
import { UserInfoService } from 'src/app/core/services/user-info.service';



@Component({
  selector: 'bbw-create-ip-dialog',
  templateUrl: './create-ip-dialog.component.html',
  styleUrls: ['./create-ip-dialog.component.css']
})
export class CreateIpDialogComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public createIpLetter: any,
    private userInfoService: UserInfoService,
    public createIpLetterService: CreateIpLetterService,
    public dialogRef: MatDialogRef<CreateIpDialogComponent>,
    private dialog: Dialog,
  ) { }

  loginName: string;
  startTime: string;
  recipients: string;
  message: string;
  isLoading: boolean = true;

  ccList = "";
  toList = "";

  ngOnInit() {
    //console.log(`userName:::${this.userInfo.loginName}`);
    let loginname = this.userInfoService.getSesssionUserInfo().loginName;
    this.createIpLetterService.getCreateMailData(loginname,this.createIpLetter.caseId, this.createIpLetter.letterType).
      subscribe(data => {
        this.createIpLetter = data;
        this.isLoading = false;
        this.toList = this.getToList(this.createIpLetter.recipients);
      }, error => {
        this.isLoading = false;
      });
  }

  getToList(recipients): string {
    let toList: string = "";
    for (let i = 0; i < recipients.length; i++) {
      toList += recipients[i][0] + ',';
    }

    if (toList.length < 1) return "";
    return toList.substring(0, toList.length - 1);
  }

  ngAfterViewInit() {

  }

  sendMail() {
    this.isLoading = true;
    let ipMail: any = {};

    if (this.toList == null || this.toList == undefined || this.toList.length < 2) {
      this.dialog.openDialog("Please enter 'Send To' Email Id(s)");
      return;
    }
    
    ipMail.ccList = this.getAddressList(this.ccList);
    ipMail.toList = this.getAddressList(this.toList);

    if (this.validateAddresses(ipMail.ccList) && this.validateAddresses(ipMail.toList)) {
      this.dialog.openDialog("Unsupported format in <Send To> / <CC List> mail ID(s), please update and resend.");
      return;
    }
    ipMail.message = this.createIpLetter.message;
    this.createIpLetterService.sendMail(ipMail).subscribe(data => {
      this.isLoading = false;
      this.dialog.openDialog('Mail sent successfully.');
      console.log('mail sent.');
    }, error => {
      this.isLoading = false;
      this.dialog.openDialog("Unable to reach the recipient(s)");
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
  cancelDialog(): void {
    this.dialogRef.close();
  }
}

