import { UserInfoService } from './../../../core/services/user-info.service';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { WipbinsCaseList } from '../../../core/models/wipbins-case-list';
import { ActiveWorkingCaseService } from 'src/app/core/services/active-working-case.service';
import { CaseInfoService } from 'src/app/core/services/case-info.service';
import { WipBinsService } from 'src/app/core/services/wip-bins.service';


@Component({
  selector: 'bbw-wipbin-case-list',
  templateUrl: './wipbin-case-list.component.html',
  styleUrls: ['./wipbin-case-list.component.css']
})
export class WipbinCaseListComponent implements OnInit {

  @Output() caseAction = new EventEmitter<any>();
  @Output() closeNav = new EventEmitter<any>();
  @Output() enableActionButtons = new EventEmitter<any>();

  @Input()
  wipBinsSideNav: any;
  title: string = "";
  empRole: any;
  isLoading = true;
  userTextInput = "";
  userInput = "";

  public firstList: any = 'All';
  // public secondList:any = 'ID';
  // public thiredList:any ='Starts with';
  public fourthList: any = 'Ascending';

  public selectedTyp: WipbinsCaseList = {
    "idNumber": "",
    "title": ""
  };
  disabledButton = true;
  dataSource = new MatTableDataSource<any>();
  wipBinCase: any = [];
  //Drop-Downs Values
  private map = new Map<string, string[]>([
    ['ID', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Age', ['<', '>']],
    ['Condition', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Status', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Priority', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Severity', ['starts with', 'ends with', 'contains', 'sounds like']],
    ['Title', ['starts with', 'ends with', 'contains', 'sounds like']],
  ])
  firstDrop: string = "ID";
  secondDrop: string = "starts with";

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

  @Input()
  set dataToDisplay(dataToDisplay: WipbinsCaseList[]) {
    this.dataSource.data = dataToDisplay;
    this.wipBinCase = dataToDisplay;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input()
  headerInfo: any;

  setClickedRow(row) {
    this.selectedTyp = row;
    this.title = this.selectedTyp.title;
    this.disabledButton = false;
    this.activeWorkingCaseService.setQueuesCaseList(this.selectedTyp);
    //Get table case data and emit this transaction
    let casedata: any;
    this.caseInfoService.getCaseData(this.selectedTyp.idNumber).subscribe(data => {
      casedata = data;
      this.enableActionButtons.emit(casedata);
    }, error => {
      this.enableActionButtons.emit(casedata);
    });
  }

  constructor(
    private activeWorkingCaseService: ActiveWorkingCaseService,
    private wipBinsService: WipBinsService,
    private caseInfoService: CaseInfoService, private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.empRole = this.userInfoService.getEmployeeRole();
  }

  selectDrop = ["All", "Case", "Subcase", "RQST", "SOLN", "CR", 'Quote/contact', 'Opportunity'];
  selectedDrop4 = ['Ascending', 'Descending']

  displayedColumns: string[] = ['idNumber', 'name', 'age', 'condition', 'status', 'priority', 'severity', 'title'];

  listButton() {
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
    let wipObjid = this.headerInfo.objid;

    this.wipBinsService.getCasesInWipBinBasedOnInputs(wipObjid, option, subOpt, sortOpt, queryInput)
      .subscribe(
        data => {
          this.wipBinCase = this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        }, error => {
          this.isLoading = false;
        })
    this.dataSource.data = this.wipBinCase;

  }
  openCase() {
    console.log(this.selectedTyp);
    this.caseAction.emit({ 'from': 'wipbin', 'action': 'open', 'caseInfo': this.selectedTyp });
  }

  dispatchCase() {
    console.log(this.selectedTyp);
    this.caseAction.emit({ 'from': 'wipbin', 'action': 'dispatch', 'caseInfo': this.selectedTyp });
  }

  closeSideNav() {
    this.closeNav.emit();
  }

}
