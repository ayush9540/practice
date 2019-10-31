import { UserInfoService } from './../../../core/services/user-info.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { SelectWipbin } from 'src/app/core/models/select-wipbin';
import { WipbinsOpsService } from 'src/app/core/services/wipbins-ops.service';
import { Dialog } from 'src/app/shared/util/dialog';

@Component({
  selector: 'bbw-new-wipbin',
  templateUrl: './new-wipbin.component.html',
  styleUrls: ['./new-wipbin.component.css']
})
export class NewWipbinComponent implements OnInit {

  public selectedTyp: SelectWipbin;
  public replaceButton: boolean = false;
  empRole:any;

  constructor(
    public dialogRef: MatDialogRef<NewWipbinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogBox: Dialog,private userInfoService:UserInfoService,
    private wipbinsOpsService: WipbinsOpsService) {
    this.selectedTyp = data.wipBinInfo;
    if (data.isNew) {
      this.replaceButton = true;
    }
  }

  ngOnInit() {

    this.empRole=this.userInfoService.getEmployeeRole();

  }

  validate() {
    if (this.selectedTyp.title == null || this.selectedTyp.title == undefined || this.selectedTyp.title.trim().length < 1) {
      this.dialogBox.openDialog('Enter title of the WIPbin.');
      return false;
    }
    return true;
  }

  addWipBin() {
    //insertion action
    if (!this.validate()) {
      return;
    }
    let wipBin: any = {};
    wipBin.objid = null;
    wipBin.title = this.selectedTyp.title;
    wipBin.description = this.selectedTyp.description;
    this.wipbinsOpsService.addWipbin(wipBin).subscribe(data => {
      //show some message
      let resp: any = data;
      this.dialogBox.openDialog(resp.message);
      if (resp.status == "SUCCESS")
        this.dialogRef.close('refresh');
    }, error => {
      //show some message
    });
  }

  replaceWipBin() {
    //update Action
    if (!this.validate()) {
      return;
    }
    let wipBin: any = {};
    wipBin.objid = this.selectedTyp.objid;
    wipBin.title = this.selectedTyp.title;
    wipBin.description = this.selectedTyp.description;
    this.wipbinsOpsService.modifyWipbin(wipBin).subscribe(data => {
      //show some message
      let resp: any = data;
      this.dialogBox.openDialog(resp.message);
      if (resp.status == "SUCCESS")
        this.dialogRef.close('refresh');
    }, error => {
      //show some message
    });
  }

  closeDialog() {
    this.dialogRef.close('nothing');
  }
}


