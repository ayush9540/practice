import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bbw-create-new-case',
  templateUrl: './create-new-case.component.html',
  styleUrls: ['./create-new-case.component.css']
})
export class CreateNewCaseComponent implements OnInit {

  constructor() { }

  // serviceIndicator=['DSL', 'External Source']
  
  mainPhonDropDown=[ 'NetSolve', 'EasyLink', 'External Source', 'NOC', 'MNS']
  selectedMainDrop =  this.mainPhonDropDown[2];

  serviceIndicator =['DSL', 'MIS', 'VPN', 'WSS'];
  selectedIndicator = this.serviceIndicator[0];

  salesDropDown = ['Please Specify', 'DSL', 'AVTS'];
  selectedSalesValue = this.salesDropDown[0];

  typeDropDown=['Request For Service'];
  selectedType =  this.salesDropDown[0];

  prioritySeverityOpt=['Please Specify'];
  selectedPriority = this.prioritySeverityOpt[0];

  subTypeOption=['Recap'];
  selectedSubTyp = this.subTypeOption[0];

  originOption = ['Please Specify'];
  selectedOrgOpt=this.originOption[0];

  custQaliOption = ['Regular Corporate'];
  selectedCustOpt = this.custQaliOption[0];

  custPromiseOpt = ['Domestic'];
  selectedCustPromise = this.custPromiseOpt[0];
  ngOnInit() {
  }

  closeDialog(){
    
  }
}

