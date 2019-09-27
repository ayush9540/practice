import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  cdata = 'I am from Child Component';
  @Input() ParentDataFromChild: string;

  
  constructor() { }

  ngOnInit() {
  }

}
