import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog,  MatDialogConfig,MAT_DIALOG_DATA,MatDialogRef} from "@angular/material";

@Component({
  selector: 'bbw-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: any) {
      this.message = message;
  }

  ngOnInit() {
    
  }

  onNo(){
    this.dialogRef.close('No');
  }
  onYes(){
    this.dialogRef.close('Yes');
  }

}
