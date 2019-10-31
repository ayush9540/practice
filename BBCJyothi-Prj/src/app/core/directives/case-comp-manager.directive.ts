import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[bbwCaseCompManager]'
})
export class CaseCompManagerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
