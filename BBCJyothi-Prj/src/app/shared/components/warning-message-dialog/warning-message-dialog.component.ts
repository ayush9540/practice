import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'bbw-warning-message-dialog',
  templateUrl: './warning-message-dialog.component.html',
  styleUrls: ['./warning-message-dialog.component.css']
})
export class WarningMessageDialogComponent implements OnInit {

  message : string;

  constructor(
    public dialogRef: MatDialogRef<WarningMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message = data.messageToDisplay;
    }
    ngOnInit(){

    }
    onNoClick(): void {
    this.dialogRef.close();
    }

}
