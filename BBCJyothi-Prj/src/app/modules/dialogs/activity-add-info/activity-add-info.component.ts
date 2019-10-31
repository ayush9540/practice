import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'bbw-activity-add-info',
  templateUrl: './activity-add-info.component.html',
  styleUrls: ['./activity-add-info.component.css']
})
export class ActivityAddInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ActivityAddInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public addInfo: any) {

  }


  ngOnInit() {
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
}
