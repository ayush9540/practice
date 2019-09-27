import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  myChildData = "I am data from Child Component"
  @Input() Pdata_from_ChildComp: string;
  @Output() myEvent: EventEmitter<string> = new EventEmitter();

  sendDataToParent() {
    this.myEvent.emit(this.myChildData);
  }

  constructor() { }

  ngOnInit() {
  }

}
