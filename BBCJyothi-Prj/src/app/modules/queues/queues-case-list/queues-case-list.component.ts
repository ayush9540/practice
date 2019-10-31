import { UserInfoService } from 'src/app/core/services/user-info.service';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { QueuesCaseList } from '../../../core/models/queues-case-list';
import { QueuesService } from '../../../core/services/queues.service';
import { ActiveWorkingCaseService } from 'src/app/core/services/active-working-case.service';
import { CaseInfoService } from 'src/app/core/services/case-info.service';
@Component({
  selector: 'bbw-queues-case-list',
  templateUrl: './queues-case-list.component.html',
  styleUrls: ['./queues-case-list.component.css']
})
export class QueuesCaseListComponent implements OnInit, AfterViewInit {

  @Output() caseAction = new EventEmitter<any>();
  @Output() closeNav = new EventEmitter<any>();
  @Output() enableActionButtons = new EventEmitter<any>();


  isLoading: boolean = false;
  @Input()
  wipBinsSideNav: any;

  //Type pending..
  //displayedColumns: string[] = ['type1', 'idNumber', 'special', 'name', 'age', 'Condition', 'status', 'type', 'priority', 'severity', 'title'];
  displayedColumns: string[] = ['idNumber', 'special', 'name', 'age', 'Condition', 'status', 'type', 'priority', 'severity', 'title'];
  dataSource = new MatTableDataSource<any>();
  queuesCase: QueuesCaseList[] = [];
  private map = new Map<string, string[]>([
    ['ID', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Age', ['<', '>']],
    ['Status', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Type', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Priority', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Severity', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Title', ['starts with', 'ends with', 'contains', 'sounds like']],
  ])
  firstDrop: string = "ID";
  secondDrop: string = "starts with";
  empRole: any;

  get selectDrop2(): string[] {
    return Array.from(this.map.keys());
  }

  get selectedDrop3(): string[] {
    let orders = this.map.get(this.firstDrop);
    return orders;
  }
  setDefault(val) {
    this.secondDrop = this.map.get(this.firstDrop)[0];
    this.userTextInput = "";
    this.userInput = "";
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.empRole = this.userInfoService.getEmployeeRole();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {

  }

  @Input()
  set dataToDisplay(dataToDisplay: QueuesCaseList[]) {
    this.dataSource.data = dataToDisplay;
    this.queuesCase = dataToDisplay;
    this.dataSource.paginator = this.paginator;
  }

  @Input()
  headerInfo: any;
  @Input() caseInfo: any;

  public firstList: any = 'All';
  public fourthList: any = 'Descending';

  selectDrop = ["All", "Case", "Subcase", "RQST", "SOLN", "CR"];
  selectedDrop4 = ["Descending", "Ascending"];
  public userInput: any = "";


  selectedRow: QueuesCaseList = {
    "queObjid": "",
    "elmObjid": "",
    "clarifyState": "",
    "idNumber": "",
    "age": "",
    "condition": "",
    "sCondition": "",
    "status": "",
    "sStatus": "",
    "title": "",
    "sTitle": "",
    "priority": "",
    "sPriority": "",
    "severity": "",
    "sSeverity": ""
  };



  disabledButton = true;
  disabledEt = true;
  title: string = "";


  constructor(private queuesService: QueuesService,
    private caseInfoService: CaseInfoService, private userInfoService: UserInfoService,
    private activeWorkingCaseService: ActiveWorkingCaseService) {
    this.disabledButton = true;
    this.selectedRow = this.queuesCase[0];
  }
  setClickedRow(row) {
    this.selectedRow = row;
    this.title = this.selectedRow.title;
    this.disabledButton = false;
    this.activeWorkingCaseService.setQueuesCaseList(this.selectedRow);
    //Get table case data and emit this transaction
    let casedata: any;
    this.caseInfoService.getCaseData(this.selectedRow.idNumber).subscribe(data => {
      casedata = data;
      this.enableActionButtons.emit(casedata);
    }, error => {
      this.enableActionButtons.emit(casedata);
    });

  }

  openCase() {
    this.caseAction.emit({ 'from': 'queue', "action": 'open', "caseInfo": this.selectedRow });
    console.log(this.selectedRow);
    //alert(this.selectedTyp.age);
  }

  rejectCase() {
    //open reject model for selected case
    this.caseAction.emit({ 'from': 'queue', "action": 'reject', "caseInfo": this.selectedRow });
    console.log(this.selectedRow);
    //alert(this.selectedTyp.status);
  }

  acceptCase() {
    //open accept model for selected case
    this.caseAction.emit({ 'from': 'queue', "action": 'accept', "caseInfo": this.selectedRow });
    console.log(this.selectedRow);
    //alert(this.selectedTyp.title);
  }

  closeSideNav() {
    this.closeNav.emit();
  }

  listButton() {

    // alert(this.firstList + "...." + this.secondList + "...." + this.thirdList + "...." + this.fourthList);
    // alert(this.panelSirAsc.value)
  }
  userTextInput: any = "";
  listClick() {
    this.dataSource.data = [];
    let option = this.firstDrop;
    let subOpt = this.secondDrop;
    let queryInput = this.userTextInput;
    if (this.firstDrop == 'Age') {
      queryInput = this.userInput;
    }
    console.log(queryInput);
    let sortOpt = this.fourthList;
    this.isLoading = true;
    let queObjid = this.headerInfo.objid;

    this.queuesService.getCasesInQueueWithFilter(queObjid, option, subOpt, sortOpt, queryInput)
      .subscribe(
        data => {
          this.queuesCase = this.dataSource.data = data;
          this.isLoading = false;
        }, error => {
          this.isLoading = false;
        })
    this.dataSource.data = this.queuesCase;

  }

}
