import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { ActivityLog } from 'src/app/core/models/activity-log';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ActivityLogService } from '../../../core/services/activity-log.service';
import { ActivityAddInfoComponent } from '../../dialogs/activity-add-info/activity-add-info.component';


@Component({
  selector: 'bbw-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit, AfterViewInit {

  @Output() changeToComponent = new EventEmitter<number>();
  activityLog: ActivityLog[] = [];
  @Input() caseInfo: any;
  isLoading = true;

  constructor(private activityLogService: ActivityLogService,
    public activityAddInfo: MatDialog, ) {
    this.isOpenButtonDisabled = true;
    this.isDateDisabled = true;
    this.isSelectedRadio = true;
    this.selectedRow = 0;
  }
  selectedRow: number;
  isOpenButtonDisabled: boolean;
  isDateDisabled: boolean;
  isSelectedRadio: boolean;
  option: string = 'localTime';

  ngOnInit() {
    this.isLoading = false;

  }
  ngAfterViewInit() {
    this.isLoading = true;
    this.activityLogService.getActivityLogData(this.caseInfo.tableCase.objid).subscribe(data => {
      this.activityLog = this.dataSource.data = data;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    }
    );
    this.dataSource.data = this.activityLog;
  }

  gotoMoreInfo(index) {
    this.changeToComponent.emit(index);
  }

  displayedColumns: string[] = ['Activity', 'Create Date', 'User', 'Additional Information'];
  dataSource = new MatTableDataSource<any>();

  //Drop-Downs Values
  private map = new Map<string, string[]>([
    ['Activity', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Create Date', ['earlier than', 'later than']],
    ['User', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Additional Information', ['starts with', 'ends with', 'contains', 'sounds like']],
  ])
  firstOrderSelected: string = "Create Date";
  secondOrderSelected: string = "earlier than";
  thirdList: string = "Descending";
  get firstOrders(): string[] {
    return Array.from(this.map.keys());
  }
  get secondOrders(): string[] {
    let orders = this.map.get(this.firstOrderSelected);
    return orders;
  }

  setDefault(val) {
    this.secondOrderSelected = this.map.get(this.firstOrderSelected)[0];
    this.userTextInput = "";
    this.userInput = "";
  }
  thirdOrders = ["Ascending", "Descending"];
  selectedAct: ActivityLog;

  public firstList: any = "";
  public secondList: any = "";
  public userInput: any = "";
  localTime: any;
  siteTime: any;




  isItChecked = true;
  size: number = 0;
  selectedIndex: number = -1;

  setClickedRow(row) {
    this.selectedAct = row;
    this.isOpenButtonDisabled = false;

  }

  openButton() {
    if (this.selectedAct == undefined || this.selectedAct.addInfo == undefined) {
      return;
    }
    this.activityAddInfo.open(ActivityAddInfoComponent, {
      disableClose: true,
      width: '42%',
      height: '340px',
      data: this.selectedAct.addInfo,
    }).afterClosed().subscribe(data => {

    });
  }

  userTextInput: any = "";
  listClick() {
    this.dataSource.data = [];
    let option = this.firstOrderSelected;
    let subOpt = this.secondOrderSelected;
    let queryInput = "";
    let siteTime = false;
    if (this.option == 'siteTime') {
      siteTime = true;
    }

    if (this.firstOrderSelected != 'Create Date') {
      queryInput = this.userTextInput;
    } else {
      try {
        queryInput = (this.userInput.getMonth() + 1) + '/' + this.userInput.getDate() + '/' + this.userInput.getFullYear();
      } catch (err) { }
    }
    console.log(queryInput);
    let sortOpt = this.thirdList;
    this.isLoading = true;
    this.activityLogService.getActivityLogWithFilter(this.caseInfo.tableCase.objid, option, subOpt, sortOpt, queryInput, siteTime)
      .subscribe(
        data => {
          this.activityLog = this.dataSource.data = data;
          this.isLoading = false;
        }, error => {
          this.isLoading = false;
        });
    this.dataSource.data = this.activityLog;
  }

  loadActivityLog() {
    this.listClick();
  }
  refreshLogsWithSelectedTime(val) {
    this.listClick();
  }
}
