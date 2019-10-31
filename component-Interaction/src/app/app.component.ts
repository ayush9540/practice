import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('inputName', {static: false}) wrapperReferenceNamme: ElementRef;
  title = 'practice';
  Cdata_from_ParentComp: string;
  myParentData = "I am data from Parent Component";
  count = 0;
  name: string;
  myname: string;
  loggedin: false;
  collapsed: boolean = true;

  public greeting = "hi I am main as parent";

  ngAfterViewInit() {
      this.wrapperReferenceNamme.nativeElement.focus(); 
      console.log(this.wrapperReferenceNamme);
      console.log(this.wrapperReferenceNamme.nativeElement);    
  }
  toggleData() {
    this.collapsed = !this.collapsed;
  }
  private $customerName: string;

  get customerName(): string {
    return this.$customerName;
  }

  set customerName(value: string) {
    this.$customerName = value;
    if(value == "gupta") {
      alert ("hello gupta ji");
    }
  }

  imgUrl = 'https://pbs.twimg.com/media/ED0YauxVUAAzw3-.jpg:large';

  incrementCount() {
    this.count += 1;
    console.log(this.count);
  }
  fireEvent(updatedValue) {
    this.name = updatedValue;
    if(updatedValue == "ayush") {
      alert("hi ayush");
    }
  }
}
