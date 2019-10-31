import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Dialog } from '../../../shared/util/dialog';
import { SelectCommitment } from 'src/app/core/models/selectCommitment';
import { CdtDateTimeService } from 'src/app/core/services/cdt-date-time.service';


@Component({
  selector: 'bbw-date-time-dialog',
  templateUrl: './date-time-dialog.component.html',
  styleUrls: ['./date-time-dialog.component.css']
})
export class DateTimeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DateTimeDialogComponent>,
    public fullFill: MatDialog,
    @Inject(MAT_DIALOG_DATA) public fullFillDate: any,
    private dialogBox: Dialog,
    private cdtDateTimeService: CdtDateTimeService,
  ) {
    if (fullFillDate == null) {
      //fullFillDate=this.year.replace(",","");
      fullFillDate = this.cdtDateTimeService.getCurrentDateTimeInCDT();
      console.log('fullFillDate in CDT:' + fullFillDate);
      //fullFillDate = new Date().toLocaleString("en-US", { timeZone: "America/Chicago", hour12: true });
      //fullFillDate = new Date().toLocaleString("en-US", { timeZone: "GMT" }); console.log(fullFillDate)
    } else {
      console.log('fullFillDate in GMT:' + fullFillDate);
      //if not null means it will be in GMT+0 format so change this to CDT 
      fullFillDate = this.cdtDateTimeService.getTransFormedDateTime(fullFillDate);
      console.log('fullFillDate in CDT:' + fullFillDate);
    }
    //03/30/1299 12:32:57 AM/PM
    if (fullFillDate != null) {

      let vals = fullFillDate.split(' ');
      let dat = vals[0];//03/30/1299
      let tim = vals[1];//12:32:57
      let timm = vals[2];//AM/PM

      let dat1 = dat.split('/');
      let tim1 = tim.split(':');


      this.month = dat1[0];//03
      this.date = dat1[1];//30
      this.year = dat1[2];//1299
      this.year = dat1[2].replace(',', '');

      this.selection = timm;//AM PM

      this.hours = tim1[0];//12
      this.minutes = tim1[1];//32
      this.seconds = tim1[2];//57


    }
    if (this.selection == null) this.selection = 'AM';
  }


  showDrop = true;
  selectedAct: SelectCommitment;

  public month: any = "";
  public date: any = "";
  public year: any = "";
  public hours: any = "";
  public minutes: any = "";
  public seconds: any = "";
  public twelveHour: any;
  public twentyFourHour: any;
  public selection: any = "AM";


  twelveFormat() {
    this.showDrop = true;
  }
  twentyFourFormat() {
    this.showDrop = false;
  }

  ngOnInit() {

  }

  showDialog(msg) {
    this.dialogBox.openDialog(msg);
  }

  validate() {
    if (this.hours > 12) {
      this.showDialog("hours should not be greater than 12 hours");
      return false;
    } else if (this.hours < 0) {
      this.showDialog("hours should be greater than 0");
      return false;
    } else if (this.minutes > 59) {
      this.showDialog("minutes should not be greater than 59 minutes");
      return false;
    } else if (this.minutes < 0) {
      this.showDialog("minutes should be greater than 0");
      return false;
    } else if (this.seconds > 59) {
      this.showDialog("seconds should not be greater than 59 seconds");
      return false;
    } else if (this.seconds < 0) {
      this.showDialog("seconds should be greater than 0");
      return false;
    }
    return true;
  }

  //=========================================================================================================================//
  fullFillModify() {
    if (!this.validate()) {
      return;
    }
    let fullDate = this.addZeroIfRequired(this.month) + "/" + this.addZeroIfRequired(this.date)
      + "/" + this.year + " " + this.addZeroIfRequired(this.hours)
      + ":" + this.addZeroIfRequired(this.minutes) + ":"
      + this.addZeroIfRequired(this.seconds) + " " + this.selection;
    console.log('fullDate in CDT' + fullDate);
    fullDate = this.cdtDateTimeService.getGMTDateTime(fullDate);
    console.log('fullDate in GMT' + fullDate);
    this.dialogRef.close({ action: 'Yes', "fullFillDate": fullDate });
  }
  //==========================================================================================================================//

  addZeroIfRequired(value) {
    if (value == undefined || value == null || value == "") return "00";
    return (value != null && value < 10 && value.length <= 1) ? "0" + value : value;
  }
  cancelDialog(): void {
    this.dialogRef.close({ action: 'No', "fullFillDate": null });
  }
}
