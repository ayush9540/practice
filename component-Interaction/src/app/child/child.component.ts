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
  loggedin = true;

  @Input() public SomeParentData: string;
  @Output() public someChildData = new EventEmitter();

  sendDataToParent() {
    this.myEvent.emit(this.myChildData);
  }

  sndToParent(){
    this.someChildData.emit("I am some dummy data");
  }

  public person = {
    "first":"ayush",
    "second":"gupta"
  }

  constructor() { }

  ngOnInit() {
  }

}
