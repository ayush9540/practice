import { Component, OnInit, Inject, Input, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { HsiaInfo } from './../../../core/models/hsiaInfo';
import { HsiaInfoService } from '../../../core/services/hsia-info.service'

@Component({
  selector: 'bbw-hsia-dialog',
  templateUrl: './hsia-dialog.component.html',
  styleUrls: ['./hsia-dialog.component.css']
})
export class HsiaDialogComponent implements OnInit,AfterViewInit {


  hsiaInfo: HsiaInfo;

  @Input() caseInfo: any;
  dataSource = new MatTableDataSource<any>();

  constructor(
    public dialogRef: MatDialogRef<HsiaDialogComponent>,
    private hsiaInfoService: HsiaInfoService, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.hsiaInfo = data;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
   // this.hsiaInfoService.getHsiaInfoData(this.caseInfo.tableCase.objid).subscribe(data => this.hsiaInfo = data);    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
