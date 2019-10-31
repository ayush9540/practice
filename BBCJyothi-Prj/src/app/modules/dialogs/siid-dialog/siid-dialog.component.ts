import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialogRef } from '@angular/material';
import { SiidData } from '../../../core/models/siid-data';
import { SiidService } from '../../../core/services/siid.service';
import { ServiceInfoService } from 'src/app/core/services/service-info.service';
import { ServiceInfo } from 'src/app/core/models/service-info';
import { BillingService } from 'src/app/core/services/billing.service';


@Component({
  selector: 'bbw-siid-dialog',
  templateUrl: './siid-dialog.component.html',
  styleUrls: ['./siid-dialog.component.css']
})
export class SiidDialogComponent implements OnInit, AfterViewInit {

  constructor(private siidService: SiidService,
    private _serviceInfoService: ServiceInfoService,
    public dialogRef: MatDialogRef<SiidDialogComponent>,
    private billingService: BillingService) { }

  displayedColumns: string[] = ['advance', 'service', 'emf', 'product', 'prodpak', 'status', 'startdate'];
  dataSource = new MatTableDataSource<any>();
  public siidData: SiidData[] = [];
  selectedTyp: SiidData = {
    "productPkg": "",
    "emfCode": "",
    "pppDescription": "",
    "status": ""
  }
  serviceInfo: ServiceInfo;
  statusDropdown = ["ADD", "DELETE", "ACTIVE", "INACTIVE"];

  ngOnInit() {
    this.serviceInfo = this._serviceInfoService.getSelectedServiceInfo();
    if (this.serviceInfo != undefined && this.serviceInfo.tableInstalledOption != undefined) {
      this.siidData = this.serviceInfo.tableInstalledOption;
    }
    this.dataSource.data = this.siidData;
  }

  ngAfterViewInit() {
    this._serviceInfoService.getSIIDInfo(this.serviceInfo.objid).subscribe(data => {
      if (data != undefined && data != null) {
        this.siidData = this.dataSource.data = data;
      }
    })
  }

  setClickedRow(row) {
    this.selectedTyp = row;
  }

  replaceSiid() {
    this.billingService.replaceSiid(this.selectedTyp).subscribe(data => {
      console.log('success....');
    }, error => {
      console.log('error....');
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
