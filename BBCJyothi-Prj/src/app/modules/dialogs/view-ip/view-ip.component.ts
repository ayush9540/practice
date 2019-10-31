import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewIpsService } from '../../../core/services/view-ips.service';
import { ViewIp } from '../../../core/models/view-ip';
import { CaseInfo } from 'src/app/core/models/case-info';
import { CaseInfoService } from 'src/app/core/services/case-info.service';

@Component({
  selector: 'bbw-view-ip',
  templateUrl: './view-ip.component.html',
  styleUrls: ['./view-ip.component.css']
})
export class ViewIpComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  public viewIp: ViewIp[] = [];
  selectedTyp: ViewIp;
  caseId: string;
  selectedRowIndex: number;
  caseInfo: CaseInfo;
  displayedColumns: string[] = ['caseId', 'lanSubnet', 'lanEu', 'availableIpFrom', 'availableIpTo', 'ipStatus'];
  constructor(
    private viewIpsService: ViewIpsService,
    public dialogRef: MatDialogRef<ViewIpComponent>,
    private caseInfoService: CaseInfoService

  ) { }

  ngOnInit() {
    this.caseInfo = this.caseInfoService.getSelectedCaseInfo();
    this.caseId = this.caseInfo.caseId;

    this.viewIpsService.getViewIpsData(this.caseInfo.tableSite.siteId).subscribe(data => {
      this.viewIp = this.dataSource.data = data
    }, error => {
      this.viewIp = this.dataSource.data = [];
    }
    );

  }

  setClickedRow(row) {
    this.selectedTyp = row;
  }
  highlight(row) {
    this.selectedRowIndex = row;
  }

  closeDialog() {
    this.dialogRef.close();
  }



}
