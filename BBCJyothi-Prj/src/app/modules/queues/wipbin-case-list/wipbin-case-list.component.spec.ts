import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WipbinCaseListComponent } from './wipbin-case-list.component';

describe('WipbinCaseListComponent', () => {
  let component: WipbinCaseListComponent;
  let fixture: ComponentFixture<WipbinCaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WipbinCaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WipbinCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
