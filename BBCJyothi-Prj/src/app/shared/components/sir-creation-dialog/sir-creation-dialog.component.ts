import { Component,EventEmitter, Inject, Output} from '@angular/core';
import {MatDialog,  MatDialogConfig,MAT_DIALOG_DATA,MatDialogRef} from "@angular/material";
import { CaseInfo } from 'src/app/core/models/case-info';
import {SirResponse} from './SirResponse';
import { Observable, of} from 'rxjs';
import { HttpClient ,HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BrassComponent } from 'src/app/modules/case/brass/brass.component';
import { BrassService } from 'src/app/core/services/brass.service';


@Component({
  selector: 'bbw-sir-creation-dialog',
  templateUrl: './sir-creation-dialog.component.html',
  styleUrls: ['./sir-creation-dialog.component.css'],
  
})
export class SirCreationDialogComponent  {

@Output() basedOnSirResponse = new EventEmitter<boolean>();

  buttonDisabled: boolean;

  private _url: string ='./sendSirRequest';

  constructor(
    public dialogRef: MatDialogRef<SirCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public caseId: any,private http : HttpClient,public dummy:BrassService) {

    }
    
    sirResponse = {
      "resultMessage" : "do Nothing",
      "resultCode": 700
    };

    

    onOkClick()
    {
      console.log(`trigger SIR rest call`);
      const params = new HttpParams().set('caseId',this.caseId);
      console.log(`URL:::${this._url},params ::: ${params}`);
     this.http.get<SirResponse>(this._url,{params}).subscribe(data =>{
      console.log('response status code :: '+data);
if(data.resultCode==null && data.resultMessage==null){
  console.log(`Service Instance Request not created `);
}else{
  console.log(` Service Instance Request created successfully`);
}
this.dialogRef.close(data);
     
     },error=>{
      if (error instanceof HttpErrorResponse) {
        console.log(`status code against Sir creation request:::${error.status}`);
         //Backend returns unsuccessful response codes such as 404, 500 etc.				  
         console.error('Backend returned status code: ', error.status);
         console.error('Response body:', error.message);          	  
     } else {
         //A client-side or network error occurred.	          
         console.error('An error occurred:', error.message);          
     } 
     this.sirResponse.resultMessage= error.message;
     this.sirResponse.resultCode=error.status;
     console.log(error.status +':'+error.message);
     this.dialogRef.close(this.sirResponse);
     }
    );
}
    onCancelClick(){
      this.sirResponse.resultMessage= "";
      this.sirResponse.resultCode=800;
     this.dialogRef.close(this.sirResponse);

    }
}
