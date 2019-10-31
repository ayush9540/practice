import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ServiceInfoService } from 'src/app/core/services/service-info.service';

@Component({
  selector: 'bbw-view-cpe',
  templateUrl: './view-cpe.component.html',
  styleUrls: ['./view-cpe.component.css']
})
export class ViewCpeComponent implements OnInit {

  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ViewCpeComponent>,
    private serviceInfoService: ServiceInfoService,
    @Inject(MAT_DIALOG_DATA) public serviceInfo: any) { }

  ngOnInit() {
  }

  saveCpeInfo() {
    let cpeInfo: any = {};
    cpeInfo.objid = this.serviceInfo.objid;
    cpeInfo.cpeShipInfo = this.serviceInfo.cpeShipInfo;
    cpeInfo.dslRouterType = this.serviceInfo.dslRouterType;
    cpeInfo.dslRouterLogin = this.serviceInfo.dslRouterLogin;
    cpeInfo.dslRouterPwd = this.serviceInfo.dslRouterPwd;
    cpeInfo.dslRouterSerialNum = this.serviceInfo.dslRouterSerialNum;
    cpeInfo.secondaryCpeLogin = this.serviceInfo.secondaryCpeLogin;
    cpeInfo.secondaryCpePwd = this.serviceInfo.secondaryCpePwd;
    cpeInfo.secondaryCpeType = this.serviceInfo.secondaryCpeType;
    this.isLoading = true;
    this.serviceInfoService.saveCpeInfo(cpeInfo).subscribe(data => {
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
