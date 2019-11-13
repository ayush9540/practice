import { Component, OnInit } from '@angular/core';
import {User} from './user';
import {EnrollmentService} from './enrollment.service';

@Component({
  selector: 'app-form-tdf',
  templateUrl: './form-tdf.component.html',
  styleUrls: ['./form-tdf.component.css']
})
export class FormTdfComponent implements OnInit {
  topicHasError = true;
  topics = ['angular', 'bootstrap', 'react'];
  userModel = new User('ayush','ayush@gmail.com',9540772145,"dafault",'morning',true);
  ngOnInit() {
  }
  constructor(private _enrollmentService: EnrollmentService) {

  }
  validateTopic(value) {
    if(value === 'default') {
      this.topicHasError = true;
    }
    else {
      this.topicHasError = false;
    }
  }
  onSubmit() {
    console.log(this.userModel);
  }
}
