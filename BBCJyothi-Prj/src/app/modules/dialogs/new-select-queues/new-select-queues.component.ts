import { Component, OnInit, Inject } from '@angular/core';
import { NewSelectQueue } from '../../../core/models/new-select-queue';
import { NewSelectQueueService } from '../../../core/services/new-select-queue.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Member } from '../../../core/models/new-select-queue';
import { QueueMoreInfoComponent } from '../../dialogs/queue-more-info/queue-more-info.component';
import { QueueMember } from 'src/app/core/models/queue-member';
import { Dialog } from 'src/app/shared/util/dialog';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { QueuesHostComponent } from '../../queues/queues-host/queues-host.component';
import { QueuesService } from 'src/app/core/services/queues.service';


@Component({
  selector: 'bbw-new-select-queues',
  templateUrl: './new-select-queues.component.html',
  styleUrls: ['./new-select-queues.component.css']
})
export class NewSelectQueuesComponent implements OnInit {

  select: any;

  loadDefaultQueueData() {
    this.select = {
      "objid": null,
      "title": "",
      "sTitle": null,
      "sharedPers": 1,
      "allowCase": 1,
      "allowSubcase": 1,
      "allowProbdesc": 1,
      "allowDmndDtl": 1,
      "description": "",
      "sortBy": null,
      "maxRespTime": 0,
      "objReceived": 0,
      "objAccepted": 0,
      "objForwarded": 0,
      "objRejected": 0,
      "objDispatched": 0,
      "objEscalated": 0,
      "legalObjType": 0,
      "iconId": 0,
      "allowBug": 1,
      "dialogId": 376,
      "department": null,
      "queue2monitor": null,
      "queue2distSrv": null,
      "allowContract": 1,
      "allowJob": 1,
      "allowOpp": 1,
      "allowTask": 1,
      "dev": 0,
      "allowDialogue": 1
    };
  }

  private allQueuesMembers: QueueMember[] = [];
  private queueMembers: QueueMember[] = [];
  private queueSupervisors: QueueMember[] = [];


  isNew: boolean = false;
  empRole:any;
  queueswipbinshost: QueuesHostComponent;

  public newSelectQueue: NewSelectQueue[] = []
  constructor(private newSelectQueueService: NewSelectQueueService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewSelectQueuesComponent>,
    public dialog: MatDialog,
    private dialogBox: Dialog,
    private userInfo: UserInfoService,
    private queuesService: QueuesService,
  ) {
    this.queueswipbinshost = data.event;
    if (data.action == 'New') {
      this.isNew = true;
      this.loadDefaultQueueData();
      let queueMember: any = {};
      let userInfo = this.userInfo.getSesssionUserInfo();
      queueMember.objid = userInfo.objid;
      queueMember.loginName = userInfo.loginName;
      queueMember.status = userInfo.status;
      this.queueSupervisors.push(queueMember);
    } else {
      this.isNew = false;
      this.select = data.queueInfo;
    }
  }
  ngOnInit() {
    this.empRole=this.userInfo.getEmployeeRole();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  moreInfo: any = {};
  firstTime: boolean = true;

  moreInfoQueues() {
    this.allQueuesMembers = this.newSelectQueueService.getAllQueuesMembers();
    this.dialog.open(QueueMoreInfoComponent, {
      width: '66%',
      disableClose: true,
      data: {
        "title": this.select.objid != null ? 'Untitled1' : this.select.title,
        "isNew": this.isNew,
        "firstTime": this.firstTime,
        "allMembers": this.allQueuesMembers,
        "queueInfo": this.select,
        "queueMembers": this.queueMembers,
        "queueSupervisors": this.queueSupervisors
      }
    }).afterClosed().subscribe(data => {
      this.moreInfo = data.moreInfo;
      this.queueMembers = this.moreInfo.queueMembers;
      this.queueSupervisors = this.moreInfo.queueSupervisors;
      this.firstTime = false;
      console.log('got members list from more info screen:' + this.moreInfo);
    });
    this.firstTime = false;
  }

  sendQueueInfo(queueData) {
    if (queueData.queueInfo.title == null || queueData.queueInfo.title.length < 1) {
      this.dialogBox.openDialog('Enter Title of the Queue.');
      return;
    }
    queueData.queueMembers = this.moreInfo.queueMembers;
    queueData.queueSupervisors = this.moreInfo.queueSupervisors;
    this.newSelectQueueService.createQueue(queueData).subscribe(data => {
      //Success
      this.dialogBox.openDialog(data.message);
      //Refresh the my queues and all queues...
      this.refreshMyQueues();
      console.log('Queue created successfully.');
      this.dialogRef.close();
    }, error => {
      //Failure
      console.log('Queue creation failed.');
    })
  }

  refreshMyQueues() {
    this.queuesService.getAllQueuesList().then(data => {
      //set and refresh all queues data and my queues data
      this.queuesService.setLocalAllQueuesList(data);
      this.queueswipbinshost.refreshAllQueuesData(data);
    });
    this.queuesService.getMyQueuesList().then(data => {
      let queues: any = data;
      //set and refresh all queues data and my queues data
      this.queueswipbinshost.refreshQueuesData(queues);
    });
  };

  addQueue() {
    let queueData: any = {};
    queueData.queueInfo = this.select;
    queueData.queueInfo.objid = null;
    this.sendQueueInfo(queueData);
  }

  replaceQueue() {
    let queueData: any = {};
    queueData.queueInfo = this.select;
    this.sendQueueInfo(queueData);
  }
}