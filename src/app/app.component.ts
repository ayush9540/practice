import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practice';
  Cdata_from_ParentComp: string;
  myParentData = "I am data from Parent Component";
}
