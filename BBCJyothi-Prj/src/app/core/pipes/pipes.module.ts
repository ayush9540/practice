import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArraySearchFilterPipe } from './array-search-filter.pipe';
import { ToLocalTimePipe } from './to-local-time.pipe';
import { ToSiteTimePipe } from './to-site-time.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ArraySearchFilterPipe,
    ToLocalTimePipe,
    ToSiteTimePipe
  ],
  exports: [
    ArraySearchFilterPipe,
    ToLocalTimePipe,
    ToSiteTimePipe,
  ]
})
export class PipesModule { }
