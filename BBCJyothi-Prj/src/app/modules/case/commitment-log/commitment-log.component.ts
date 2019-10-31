import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bbw-commitment-log',
  templateUrl: './commitment-log.component.html',
  styleUrls: ['./commitment-log.component.css']
})
export class CommitmentLogComponent implements OnInit {

  isItChecked:any;
  selected:any;

  constructor() { }

  ngOnInit() {
  }

}
