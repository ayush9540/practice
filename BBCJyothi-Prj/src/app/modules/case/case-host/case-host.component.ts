import { Component, OnInit, ViewChild, Input, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { CaseCompManagerDirective } from '../../../core/directives/case-comp-manager.directive';
import { CaseCompItem } from '../../../core/models/case-comp-item';
import { CaseInfoService } from 'src/app/core/services/case-info.service';

@Component({
  selector: 'bbw-case-host',
  templateUrl: './case-host.component.html',
  styleUrls: ['./case-host.component.css']
})
export class CaseHostComponent implements OnInit {

  @Input() caseCompItems: CaseCompItem[];

  @ViewChild(CaseCompManagerDirective) caseHost: CaseCompManagerDirective;

  @Input() appCompRef: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private caseinfoService: CaseInfoService) { }

  currentCompIndex = -1;

  ngOnInit() {
    this.loadComponent(0);
  }

  ngOnDestroy() {

  }

  openCase(caseId) {
    this.appCompRef.getCaseInfo(caseId);
  }

  setIsNewCaseTrue() {
    this.appCompRef.enableSave();
  }

  loadComponent(index: number) {
    // this.currentAdIndex = (this.currentAdIndex + 1) % this.caseCompItems.length;
    this.currentCompIndex = index;
    console.log(this.caseCompItems);
    let compItem = this.caseCompItems[this.currentCompIndex];
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(compItem.component);
    let viewContainerRef = this.caseHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance).changeToComponent.subscribe((compIndex: number) => {
      this.loadComponent(compIndex);
    });
    //Register openGiven case event only when component is case info component
    if (this.currentCompIndex == 0) {
      (componentRef.instance).openGivenCase.subscribe((caseId: any) => {
        this.openCase(caseId);
      });
      //Set save button enable...
      (componentRef.instance).enableSave.subscribe(data => {
        this.setIsNewCaseTrue();
      });
    }

    this.caseinfoService.setContainerRef(componentRef.instance);
    //(<AdComponent>componentRef.instance).data = adItem.data;
  }

}
