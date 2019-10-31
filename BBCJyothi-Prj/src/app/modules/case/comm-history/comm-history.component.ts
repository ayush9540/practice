import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { CommHistory } from '../../../core/models/comm-history';
import { MatTableDataSource } from '@angular/material';
import { CommHistoryService } from '../../../core/services/comm-history.service';
import { CaseInfo } from 'src/app/core/models/case-info';
@Component({
  selector: 'bbw-comm-history',
  templateUrl: './comm-history.component.html',
  styleUrls: ['./comm-history.component.css']
})
export class CommHistoryComponent implements OnInit,AfterViewInit {

  @Output() changeToComponent = new EventEmitter<number>();

  @Input() caseInfo: CaseInfo;
  isLoading:boolean = true;
  
  commHistory: CommHistory[] = [];

  constructor(private commHistoryService: CommHistoryService) {
    this.selectedRow = 0;
   }
   selectedRow: number;

  ngOnInit() {
    this.isLoading = false;
  }

  ngAfterViewInit(){
    this.isLoading = true;
    this.commHistoryService.getCommHistoryData(this.caseInfo.tableCase.objid).subscribe(data=> 
      {
        this.commHistory = this.dataSource.data = data;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
      );
    this.dataSource.data = this.commHistory;
  }

  displayedColumns: string[] = ['Title', 'Scheduled Date', 'Original Date', 'Complete Date','Hold Reason','Offs'];
  dataSource = new MatTableDataSource<any>();

  selectedAct: CommHistory;
  size: number = 0;
  selectedIndex: number = -1;

  setClickedRow(row) {
    this.selectedAct = row;
  }

  gotoMoreInfo(index) {
    this.changeToComponent.emit(index);
  }
}
