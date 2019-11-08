import { Component, OnInit } from '@angular/core';
import {User} from './user';

@Component({
  selector: 'app-form-tdf',
  templateUrl: './form-tdf.component.html',
  styleUrls: ['./form-tdf.component.css']
})
export class FormTdfComponent implements OnInit {

  topics = ['angular', 'bootstrap', 'react'];
  userModel = new User('ayush','ayush@gmail.com',9540772145,'','morning',true);
  ngOnInit() {
  }

}
