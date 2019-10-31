import { Component, OnInit, Input } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/modules/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'bbw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @Input() userInfo: UserInfo;
  @Input() caseIdList: any;

  ngOnInit() {

  }

  invalidateSession() {
    let message = "Do you want to logout?";
    let size = this.caseIdList != null ? this.caseIdList.length : 0;
    console.log('currently opened cases..:' + size);
    if (size > 0) {
      message = "Do you want to logout without saving?";
    }
    this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: message
    }).afterClosed().subscribe(action => {
      if (action == 'Yes') {
        location.href = "./invalidateSession";
      } else {
        //Do nothing...
      }
    });

  }

}
