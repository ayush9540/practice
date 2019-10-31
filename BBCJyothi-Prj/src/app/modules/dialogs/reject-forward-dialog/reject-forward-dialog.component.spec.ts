import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectForwardDialogComponent } from './reject-forward-dialog.component';

describe('RejectForwardDialogComponent', () => {
  let component: RejectForwardDialogComponent;
  let fixture: ComponentFixture<RejectForwardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectForwardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectForwardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
