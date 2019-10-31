import { Component, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { YankService } from '../../../core/services/yank.service';
import { HttpClient ,HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Dialog } from '../../../shared/util/dialog';
import { CaseInfoService } from '../../../core/services/case-info.service';
import { UserInfoService } from 'src/app/core/services/user-info.service';

@Component({
  selector: 'bbw-yank-creation-dialog',
  templateUrl: './yank-creation-dialog.component.html',
  styleUrls: ['./yank-creation-dialog.component.css']
})
export class YankCreationDialogComponent {
  buttonDisabled: boolean;
  public SelectCase: any= "Case";
  public selectedCaseId:any="";
  selectDrop = ["Case"];

  private _url: string ='../ordermgmtservice/v1/service/createSirRequest';

    constructor(
    private caseInfoService:CaseInfoService,
    private userInfoService: UserInfoService,
    public yankService:YankService,
    private dialog : Dialog,
    public dialogRef: MatDialogRef<YankCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public caseId: any,
    private http : HttpClient,public dummy:YankService) {
      if(caseId != undefined){
        this.selectedCaseId = caseId;
      }else{
        this.selectedCaseId = "";
      }
    }

    ngOnInit(){
      // //Need to get from WIPBINS data also...
      // console.log('in Yank modal');
      // let caseInfo = this.caseInfoService.getSelectedCaseInfo();
      // if(caseInfo != undefined){
      //   this.selectedCaseId = this.caseInfoService.getSelectedCaseInfo().caseId;
      // }
      // console.log('case ID received'+this.selectedCaseId);
      // console.log('in Yank modal');
    }

    onYankClick(){

      if(this.selectedCaseId == null || this.selectedCaseId.length <1){
        this.dialog.openDialog('Please enter valid case ID.');
        return;
      }
      let attuid = this.userInfoService.getSesssionUserInfo().userAttuid;
      this.yankService.yankCase(this.selectedCaseId,attuid).then(data =>{
        this.dialogRef.close('Do Nothing...');
        this.dialog.openDialog(data.message);
      },error=>{
        this.dialogRef.close('Do Nothing...');
        this.dialog.openDialog("Yank Case Failed.");
      }
      );

    }

  onCancelClick(){
    this.dialogRef.close('Do Nothing...');
  }

}


