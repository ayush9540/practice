import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../core/models/user-info';
import { UserInfoService } from '../core/services/user-info.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../modules/dialogs/confirm-dialog/confirm-dialog.component';
import { Dialog } from '../shared/util/dialog';


@Component({
  selector: 'bbw-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  userInfo: UserInfo;
  showMain = false;
  attMessage = "Warning Message\r\n" +
    "\r\n" +
    "\r\n" +
    "This system is resticted to AT&T authorized users for\r\n" +
    "\r\n" +
    "legitimate business purpose and is subject to audit.\r\n" +
    "\r\n" +
    "The actual or attempted unauthorized access, use or\r\n" +
    "\r\n" +
    "modification of computer systems is a violation of \r\n" +
    "\r\n" +
    "federal and state laws. All users must comply with\r\n" +
    "\r\n" +
    "Corporate Security Instructions regarding protection\r\n" +
    "\r\n" +
    "of AT&T information assets.\r\n";

  constructor(
    private userInfoService: UserInfoService,
    private messageBox: Dialog,
    private dialog: MatDialog) {
    this.showMain = false;
  }

  getUserInfoFromHtml() {
    let object: any = document.getElementById('userInfo');
    console.log('userInfo' + object.value);
    if (object.value == null || object.value == "") {
      let dummy = 'Dummy';
      this.userInfo = {
        loginName: "dev_d_sa",
        wirelessEmail: dummy,
        user2pageClass: dummy,
        userAccessIndicator: dummy,
        sLoginName: dummy,
        agentId: dummy,
        status: dummy,
        equipId: dummy,
        csLic: dummy,
        csdeLic: dummy,
        cqLic: dummy,
        passwdChg: dummy,
        lastLogin: dummy,
        clfoLic: dummy,
        csLicType: dummy,
        cqLicType: dummy,
        csftsdeLic: dummy,
        webLogin: dummy,
        sWebLogin: dummy,
        submitterInd: dummy,
        userAccess2privclass: dummy,
        userDefault2wipbin: dummy,
        supvrDefault2monitor: dummy,
        user2rcConfig: dummy,
        user2srvr: dummy,
        sfaLic: dummy,
        univLic: dummy,
        dev: dummy,
        locale: dummy,
        nodeId: dummy,
        offline2privclass: dummy,
        csftsLic: dummy,
        cqftsLic: dummy,
        objid: "268525973",
        userAttuid: dummy,
        userRole: "System Administrator"
      }
    } else {
      this.userInfo = JSON.parse(object.value);
    }
    console.log('userInfo' + this.userInfo);
    this.userInfoService.setUserInfo(this.userInfo);
    this.userInfoService.setEmployeeRole(this.userInfo.userRole);
  }

  ngOnInit() {
    this.getUserInfoFromHtml();
    //Enable if this service also need to be moved to micro service
    // this.userInfoService.getUserInfo().subscribe(data => {
    //   this.userInfo = data;
    //   this.userInfoService.setUserInfo(this.userInfo);
    //   this.showMain = true;
    // });
    //this.showMain = true;
  }

  interval: any;
  hideThisLicence() {
    this.showMain = true;
    //Monitor the user active or not for every minute....
    this.interval = setInterval(this.countTime, this.minute, this); //Per minute
    //this.interval = setInterval(this.countTime, this.milliseconds, this); //Per Second
  }

  private milliseconds: number = 1000;
  private seconds: number = 60;
  private minute: number = this.seconds * this.milliseconds;

  countTime(current) {
    console.log('User inactive for ' + current.userInfoService.userInActive + ' minutes.');
    current.userInfoService.userInActive += 1;
    if (current.userInfoService.userInActive >= current.userInfoService.sessionTimeout - 1) {
      console.log('Clearing counter for inactive session.')
      clearInterval(current.interval);
      current.refreshForSessionExpire();
    }
  }

  logoutFromHere() {
    this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: 'Do you want to logout from BBW?'
    }).afterClosed().subscribe(action => {
      if (action == 'Yes') {
        location.href = "./invalidateSession";
      } else {
        //Do nothing...
      }
    });
  }

  refreshForSessionExpire() {
    this.messageBox.openDialog('Your session was inactive for ' + this.userInfoService.sessionTimeout + ' minutes.Click close button to refresh.').afterClosed().subscribe(action => {
      try {
        location.reload();
      } catch (err) {
        location.href = "./invalidateSession";
      }
    });
  }
}
