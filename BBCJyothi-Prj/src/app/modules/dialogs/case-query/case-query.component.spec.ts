import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseQueryComponent } from './case-query.component';

describe('CaseQueryComponent', () => {
  let component: CaseQueryComponent;
  let fixture: ComponentFixture<CaseQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
