import { Component, OnInit } from '@angular/core';
import { SelectEmployeesService } from '../../../core/services/select-employees.service';
import { SelectEmployees } from '../../../core/models/select-employees';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { EmpDetailComponent } from '../emp-detail/emp-detail.component';
import { Dialog } from 'src/app/shared/util/dialog';


@Component({
  selector: 'bbw-select-employees',
  templateUrl: './select-employees.component.html',
  styleUrls: ['./select-employees.component.css']
})
export class SelectEmployeesComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  public selectEmployees: SelectEmployees[] = [];
  selectedEmp: SelectEmployees;
  desibledButton = true;
  index: number;

  constructor(
    private selectEmployeesService: SelectEmployeesService,
    public dialogRef: MatDialogRef<SelectEmployeesComponent>,
    public dialogRef1: MatDialogRef<EmpDetailComponent>, public dialog: MatDialog
  ) { }

  sortOption = ['First Name', 'Last Name', 'Login Name', 'ATTUID', 'Office', 'Node Id'];
  fieldName = this.sortOption[0];
  fieldValue = "";
  subOption = ['Starts With', 'Ends With', 'Contains', 'Sounds Like'];
  operator = this.subOption[0];
  optionValue = ['Ascending', 'Descending'];
  sortby = this.optionValue[0];

  displayedColumns: string[] = ['firstName', 'lastName', 'loginName', 'attId', 'office', 'nodeId'];
  ngOnInit() {
  }

  isLoading = false;

  loadEmployeeData() {

    let requestBody: any = {};

    if (this.fieldValue != null && this.fieldValue != "") {
      this.isLoading = true;
      requestBody.fieldName = this.fieldName;
      requestBody.fieldValue = this.fieldValue;
      requestBody.sortby = this.sortby;
      requestBody.operator = this.operator;

      this.selectEmployeesService.getSelectedEmployeeData(requestBody).subscribe(data => {
        this.isLoading = false;
        this.selectEmployees = this.dataSource.data = data.findEmployeeResponse;
      }, error => {
        this.isLoading = false;
      })
    }
  }

  setClickedRow(row, index) {
    this.selectedEmp = row;
    this.index = index;
    this.desibledButton = false;
  }

  newSelectEmployeeDetails() {
    this.dialog.open(EmpDetailComponent, {
      width: "80%",
      height: "470px",
      disableClose: true,
      data: { 'isNew': true, 'selectedIndex': -1, 'employeeData': [] }
    }).afterClosed().subscribe(data => {

    })
  }

  openSelectEmployeeDetails() {
    this.dialog.open(EmpDetailComponent, {
      width: "80%",
      height: "470px",
      disableClose: true,
      data: { 'isNew': false, 'selectedIndex': this.index, 'employeeData': this.selectEmployees }
    }).afterClosed().subscribe(data => {

    })

  }

  closeDialog() {
    this.dialogRef.close();
  }


}
