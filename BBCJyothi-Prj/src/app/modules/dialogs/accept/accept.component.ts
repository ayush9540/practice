import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WipBinsService } from '../../../core/services/wip-bins.service';
import { AcceptService } from '../../../core/services/accept.service';
import { WipBins } from '../../../core/models/wip-bins';
import { Dialog } from '../../../shared/util/dialog';
import { UserInfoService } from 'src/app/core/services/user-info.service';


@Component({
  selector: 'bbw-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})
export class AcceptComponent implements OnInit, AfterViewInit {

  constructor(
    private userInfoService: UserInfoService,
    public wipBinsService: WipBinsService,
    public dialogRef: MatDialogRef<AcceptComponent>,
    public acceptService: AcceptService,
    private dialog: Dialog,
    @Inject(MAT_DIALOG_DATA) public caseInfo: any,
  ) { }

  wipBins: WipBins[];
  displayedColumns: string[] = ['My WIPbins'];
  dataSource = new MatTableDataSource<any>();
  selectedAct: WipBins;
  isCheckDisabled: boolean = false;
  isAcceptButtonDisabled: boolean = false;

  setClickedRow(row) {
    this.selectedAct = row;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    let local = false;
    if (local) {
      this.wipBinsService.getMockAllWipBinList().subscribe(data => this.wipBins = this.dataSource.data = data);
    }
    else {
      this.wipBins = this.dataSource.data = this.wipBinsService.getLocalAllWipBinsList();
    }
  }

  accept() {
    let attuid = this.userInfoService.getSesssionUserInfo().userAttuid;
    this.acceptService.accept(this.caseInfo.caseId, this.selectedAct.objid, attuid).subscribe(data => {
      this.dialogRef.close();
      this.dialog.openDialog('Successfully Case ID accepted.');
    }, error => {
      this.dialog.openDialog('Error while accepting Case ID.');
      this.dialogRef.close();
    })
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

}
