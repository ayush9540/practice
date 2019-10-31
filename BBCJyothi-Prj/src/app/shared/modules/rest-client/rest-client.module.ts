import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  exports: [
    HttpModule,
    HttpClientModule,
  ],
  declarations: []
})
export class RestClientModule { }
