import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'bbw-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {
  @Output() changeToComponent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  changeComp(index){
    this.changeToComponent.emit(index);
  }
}
