import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { SelectAddressService } from 'src/app/core/services/select-address.service';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SelectAddress } from '../../../core/models/select-address';
import { NewAddressComponent } from '../new-address/new-address.component';
import { Dialog } from 'src/app/shared/util/dialog';


@Component({
  selector: 'bbw-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css']
})
export class SelectAddressComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<any>();
  public selectAddress: SelectAddress[] = [];
  selectedAddress: SelectAddress;

  address: string = "";
  city: string = "";
  state: string = "";
  country: string = "";
  isLoading = false;
  siteStatus = false;
  fieldValue = "";

  constructor(private selectAddressService: SelectAddressService,
    public dialogRef: MatDialogRef<SelectAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialog1: Dialog,
  ) {

  }

  ngOnInit() {
  }


  useOrDone() {
    if(this.selectAddress == null){
      this.dialog1.openDialog('Please select address');
      return;
    }
    this.dialogRef.close({ 'action': 'use', 'address': this.selectedAddress });
  }

  loadSelectAddressData() {
    let requestBody: any = {};
    if (this.fieldValue != null && this.fieldValue != "") {
      this.isLoading = true;
      requestBody.fieldName = this.fieldName;
      requestBody.fieldValue = this.fieldValue;
      requestBody.sortby = this.sortby;
      requestBody.operator = this.operator;
      this.selectAddressService.getSelectAddressData(requestBody).subscribe(data => {
        this.isLoading = false;
        this.selectAddress = this.dataSource.data = data.findAddressResponse;
      }, error => {
        this.isLoading = false;
      });

    }
  }



  ngAfterViewInit() {

  }

  addressDropdown = ['Address'];
  fieldName = this.addressDropdown[0];

  sortOption = ['Starts With', 'Ends With'];
  operator = this.sortOption[0];

  subOption = ['Ascending'];
  sortby = this.subOption[0];

  displayedColumns: string[] = ['address', 'city', 'state', 'country'];

  index: number
  desibledButton = true;

  setClickedRow(row, index) {
    this.selectedAddress = row;
    this.index = index;
    this.desibledButton = false;
  }



  openAddressDetails() {
    this.dialog.open(NewAddressComponent, {
      width: '80%',
      height:'465px',
      disableClose: true,
      data: { 'fromSelect': true, 'isNew': false, 'selectedIndex': this.index, 'selectAdrseData': this.selectAddress }
    }).afterClosed().subscribe(data => {

    })
  }

  openNewAddress() {
    this.dialog.open(NewAddressComponent, {
      width: '80%',
      height:'465px',
      disableClose: true,
      data: { 'isNew': true, 'selectedIndex': -1, 'selectAdrseData': [] }
    }).afterClosed().subscribe(data => {

    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
