import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgateErrorDialogComponent } from './bgate-error-dialog.component';

describe('BgateErrorDialogComponent', () => {
  let component: BgateErrorDialogComponent;
  let fixture: ComponentFixture<BgateErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgateErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgateErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
