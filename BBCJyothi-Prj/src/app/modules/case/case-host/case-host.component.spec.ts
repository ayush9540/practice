import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseHostComponent } from './case-host.component';

describe('CaseHostComponent', () => {
  let component: CaseHostComponent;
  let fixture: ComponentFixture<CaseHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
