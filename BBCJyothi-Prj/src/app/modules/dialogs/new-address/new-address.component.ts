import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NewAddress } from '../../../core/models/new-address';
import { NewAddressService } from 'src/app/core/services/new-address.service';
import { Dialog } from 'src/app/shared/util/dialog';
import { UserInfoService } from 'src/app/core/services/user-info.service';

@Component({
  selector: 'bbw-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent implements OnInit {

  details: any;
  selectedIndex: number;
  isLoading: boolean = false;
  isNew: any;
  empRole: any;
  selectAddressInfo: any;
  selectAddressDataList: any[] = [];
  disablePrev: boolean = false;
  disableNext: boolean = false;
  fromSelect: any;

  constructor(private newAddressService: NewAddressService,
    public dialogRef: MatDialogRef<NewAddressComponent>, private userInfoService: UserInfoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: Dialog,
  ) {
    this.fromSelect = data.fromSelect;
    this.isNew = data.isNew;
    if (!this.isNew && this.fromSelect) {
      console.log('From select and site details...')
      this.selectAddressDataList = data.selectAdrseData;
      this.selectedIndex = data.selectedIndex;
      if (this.selectedIndex != -1) {
        this.selectAddressInfo = Object.create(this.selectAddressDataList[this.selectedIndex]);
      }
      //this.disableNextBtn();
      //this.disablePrevBtn();
    } else {
      this.disablePrev = this.disableNext = true;
    }
  }

  stateDropdown = ['MA', 'NA', 'CT'];
  selectedState = this.stateDropdown[0];

  countryDropdown = ['USA'];
  selectedCountry = this.countryDropdown[0];

  timeZoneDrop = ['EST', 'CST', 'MST', 'PST'];
  selectedTimeZone = this.timeZoneDrop[0];

  ngOnInit() {
    this.initialize();
    this.empRole = this.userInfoService.getEmployeeRole();
  }

  ngAfterViewInit() {
    if (!this.isNew) {
      this.loadAddressDetaisl();
    } else {
      this.details = {
        "addressInfo": {}
      }
    }
  }



  selectAdsObjid: string;

  loadAddressDetaisl() {
    this.isLoading = true;
    this.selectAdsObjid = this.selectAddressInfo.objId;
    console.log('selectAddressInfo Objectid :' + this.selectAdsObjid);
    this.newAddressService.getOpenAddressDetailData(this.selectAdsObjid).subscribe(data => {
      this.isLoading = false;
      console.log(data);
      this.details = data;
      console.log(this.details);
      if (data == undefined || data == null) {
        this.dialog.openDialog('Unable to retrieve address details.');
        this.dialogRef.close();
        return;
      }
    }, error => {
      this.isLoading = false;
      this.dialogRef.close();
    })
  }


  initialize() {
    this.details = {
      "addressInfo": {}
    }
  }



  next() {
    this.selectedIndex += 1;
    this.disableNextBtn();
    this.selectAddressInfo = Object.create(this.selectAddressDataList[this.selectedIndex]);
    this.loadAddressDetaisl();
  }

  prev() {
    this.selectedIndex -= 1;
    this.selectAddressInfo = Object.create(this.selectAddressDataList[this.selectedIndex]);
    this.loadAddressDetaisl();
    this.disablePrevBtn();
  }

  disableNextBtn() {
    if (this.selectedIndex > 0) {
      this.disablePrev = false;
    }
    if (this.selectAddressDataList.length > 1) {
      this.disableNext = false;
    }
    //disable next button when no next record;
    if (this.selectAddressDataList.length == this.selectedIndex + 1) {
      this.disableNext = true;
    }
  }

  disablePrevBtn() {
    if (this.selectedIndex == 0) {
      this.disablePrev = true;
    }
    //disable previous button when no previous record;
    if (this.selectedIndex < this.selectAddressDataList.length - 1) {
      this.disableNext = false;
    }
  }

  sendAddressInfo(addressData) {
    if (
      addressData.address == undefined || addressData.address == "" ||
      addressData.city == undefined || addressData.city == "" ||
      addressData.state == undefined || addressData.state == "" ||
      addressData.zipcode == undefined || addressData.zipcode == "" ||
      addressData.county == undefined || addressData.county == "" ||
      addressData.country == undefined || addressData.country == "" ||
      addressData.timeZone == undefined || addressData.timeZone == "") {
      this.dialog.openDialog('Please enter all mandatory fields.');
      return;
    }
    if (addressData.objId == null) {
      this.newAddressService.createAddress(addressData).subscribe(data => {
        //Success
        if (this.data.fromSite == undefined || !this.data.fromSite) {
          this.dialog.openDialog(data.message);
        }
        console.log('Address created successfully.');
        this.dialogRef.close({ 'addressObjid': data.data });
      }, error => {
        //Failure
        this.dialogRef.close({ 'addressObjid': null });
        console.log('Address creation failed.');
      })
    }
    else {
      this.newAddressService.replaceAddress(addressData).subscribe(data => {
        //Success
        this.dialog.openDialog(data.message);
        //Refresh the Address
        this.refreshAddress();
        console.log('Address created successfully.');
        this.dialogRef.close();
      }, error => {
        //Failure
        this.dialogRef.close();
        console.log('Address creation failed.');
      })
    }
  }


  refreshAddress() {

  }

  addAddress() {
    let addressData: any = {};
    addressData = this.details.addressInfo;
    addressData.objId = null;
    this.sendAddressInfo(addressData);
  }

  replaceAddress() {
    let addressData: any = {};
    addressData = this.details.addressInfo;
    addressData.objId += '';
    this.sendAddressInfo(addressData);
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
