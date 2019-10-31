import { Component, OnInit, Inject } from '@angular/core';
import { BrassErrorService } from '../../../core/services/brass-error.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrassError } from 'src/app/core/models/brass-error';
import { BrassService } from '../../../core/services/brass.service';

@Component({
  selector: 'bbw-brass-error',
  templateUrl: './brass-error.component.html',
  styleUrls: ['./brass-error.component.css']
})
export class BrassErrorComponent implements OnInit {


  optionValues = ["Closed", "New", "In progress"]
  selectedValue: any = "New";
  brassError: any = {};
  currentIndex: number = 0;
  disablePrev: boolean = true;
  disableNext: boolean = true;

  constructor(public brassErrorService: BrassErrorService,
    public brassService: BrassService,
    @Inject(MAT_DIALOG_DATA) public brassErrors: BrassError[],
    public dialogRef: MatDialogRef<BrassErrorComponent>) {
    if (this.brassErrors.length > 1) {
      this.disableNext = false;
    }
    this.brassError = brassErrors[this.currentIndex];
  }

  ngOnInit() {

  }


  next() {
    this.currentIndex += 1;
    if (this.currentIndex > 0) {
      this.disablePrev = false;
    }
    this.brassError = this.brassErrors[this.currentIndex];
    //disable next button when no next record;
    if (this.brassErrors.length == this.currentIndex + 1) {
      this.disableNext = true;
    }
  }

  prev() {
    this.currentIndex -= 1;
    this.brassError = this.brassErrors[this.currentIndex];
    if (this.currentIndex == 0) {
      this.disablePrev = true;
    }
    if (this.currentIndex < this.brassErrors.length) {
      this.disableNext = false;
    }

  }
  saveBrassErrorStatus(){
    this.brassService.getBrassErrorSave(
      this.brassError.objid,
      this.brassError.status
       ).subscribe(data =>{
         console.log('response oK')
       })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
