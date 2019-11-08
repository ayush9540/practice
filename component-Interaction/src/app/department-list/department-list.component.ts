import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  departments = [
    {'id': 1, 'name': "angular"},
    {'id': 2, 'name': "mongoDB"},
    {'id': 3, 'name': "bootstrap"}
  ]

  onselect(dept) {
    this.router.navigate(['/department', dept.id])
  }

}
