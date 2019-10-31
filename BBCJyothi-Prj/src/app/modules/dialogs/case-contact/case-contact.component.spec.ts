import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseContactComponent } from './case-contact.component';

describe('CaseContactComponent', () => {
  let component: CaseContactComponent;
  let fixture: ComponentFixture<CaseContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
