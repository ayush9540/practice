import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { QueueMoreInfo } from '../../../core/models/queue-more-info';
import { QueueMoreInfoService } from '../../../core/services/queue-more-info.service';
import { QueueMember } from 'src/app/core/models/queue-member';

@Component({
  selector: 'bbw-queue-more-info',
  templateUrl: './queue-more-info.component.html',
  styleUrls: ['./queue-more-info.component.css']
})
export class QueueMoreInfoComponent implements OnInit {

  dataSource1 = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  // dataSource2= new MatTableDataSource<any>();

  displayedColumns: string[] = ["name", "attuid"];
  displayedColumns2: string[] = ["members", "active"];
  displayedColumns3: string[] = ["name", "active"];

  selectedAllQueueMember: QueueMember = null;
  selectedQueueMember: QueueMember = null;
  selectedQueueSupervisor: QueueMember = null;

  allMembers: QueueMember[] = [];
  queueMembers: QueueMember[] = [];
  queueSupervisors: QueueMember[] = [];
  queueInfo: any;

  isNew: boolean = false;
  disabledCopyButton=true;
  disabledRemovBtn=true;
  disabledRemovSupervisor = true

  firstTime: boolean = true;
  title: string = "";
  
  constructor(private queueMoreInfoService: QueueMoreInfoService,
    private dialogRef: MatDialogRef<QueueMoreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title = data.title;
    this.queueInfo = data.queueInfo;
    this.firstTime = data.firstTime;
    this.isNew = data.isNew;
    this.allMembers = data.allMembers;
    this.queueMembers = data.queueMembers;
    this.queueSupervisors = data.queueSupervisors;
  }

  ngOnInit() {
    this.dataSource1.data = this.allMembers;
    if (!this.isNew && this.firstTime) {
      this.queueMoreInfoService.getQueueMoreInfo(this.queueInfo.objid).subscribe(data => {
        let queueMoreInfo: QueueMoreInfo = data;
        if (queueMoreInfo.queueMembers != undefined && queueMoreInfo.queueMembers != null) {
          this.queueMembers = this.dataSource2.data = queueMoreInfo.queueMembers;
        }
        if (queueMoreInfo.queueSupervisors != undefined && queueMoreInfo.queueSupervisors != null) {
          this.queueSupervisors = this.dataSource3.data = queueMoreInfo.queueSupervisors;
        }
      });
    } else {
      this.dataSource2.data = this.queueMembers;
      this.dataSource3.data = this.queueSupervisors;
    }
  }

  setClickedNameRow(row) {
    this.selectedAllQueueMember = row;
    this.selectedQueueMember = null;
    this.selectedQueueSupervisor = null;
    this.disabledCopyButton = false;
    this.disabledRemovBtn = true;
    this.disabledRemovSupervisor = true;
  }

  setSelectRow(row, selectedMemberIndex) {
    this.selectedQueueMember = row;
    this.selectedMemberIndex = selectedMemberIndex;
    this.selectedQueueSupervisor = null;
    this.selectedAllQueueMember = null;
    this.disabledRemovBtn = false;
    this.disabledCopyButton = true;
    this.disabledRemovSupervisor = true;
  }

  setClickedRow(row, selectedSupervisorIndex) {
    this.selectedQueueSupervisor = row;
    this.selectedSupervisorIndex = selectedSupervisorIndex;
    this.selectedAllQueueMember = null;
    this.selectedQueueMember = null;
    this.disabledRemovSupervisor = false;
    this.disabledCopyButton = true;
    this.disabledRemovBtn = true;
  }

  selectedMemberIndex: number;
  selectedSupervisorIndex: number;


  isExist(arrayInput) {
    if (arrayInput == undefined || arrayInput.length <= 0) return false;
    return (arrayInput.indexOf(this.selectedAllQueueMember) != -1);
  }

  copyFromAllToMember() {

    if (this.isExist(this.queueMembers)) {
      console.log('copyFromAllToMember found...');
      return;
    }
    this.queueMembers.push(this.selectedAllQueueMember);
    this.dataSource2.data = this.queueMembers;
  }

  copyFromAllToSupervisors() {
    if (this.isExist(this.queueSupervisors)) {
      console.log('copyFromAllToSupervisors found...');
      return;
    }
    this.queueSupervisors.push(this.selectedAllQueueMember);
    this.dataSource3.data = this.queueSupervisors;
  }

  removeFromMembers() {
    this.queueMembers.splice(this.selectedMemberIndex, 1);
    this.dataSource2.data = this.queueMembers;
  }

  removeFromSupervisors() {
    this.queueSupervisors.splice(this.selectedSupervisorIndex, 1);
    this.dataSource3.data = this.queueSupervisors;
  }

  
 applyFilter(filterValue: string) {
  this.dataSource1.filter = filterValue;
}
  closeDialog() {
    let moreInfo: any = {};
    moreInfo.queueMembers = this.queueMembers;
    moreInfo.queueSupervisors = this.queueSupervisors;
    this.dialogRef.close({ 'moreInfo': moreInfo });
  }
}
