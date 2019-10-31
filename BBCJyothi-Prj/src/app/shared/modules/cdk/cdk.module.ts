import { NgModule } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
  ],
  declarations: []
})
export class CdkModule { }
