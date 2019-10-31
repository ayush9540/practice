import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseQueryFindCasesComponent } from './case-query-find-cases.component';

describe('CaseQueryFindCasesComponent', () => {
  let component: CaseQueryFindCasesComponent;
  let fixture: ComponentFixture<CaseQueryFindCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseQueryFindCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseQueryFindCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
