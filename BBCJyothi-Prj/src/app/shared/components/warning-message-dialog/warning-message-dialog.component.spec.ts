import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningMessageDialogComponent } from './warning-message-dialog.component';

describe('WarningMessageDialogComponent', () => {
  let component: WarningMessageDialogComponent;
  let fixture: ComponentFixture<WarningMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
