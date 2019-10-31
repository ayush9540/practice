import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HsiaDialogComponent } from './hsia-dialog.component';

describe('HsiaDialogComponent', () => {
  let component: HsiaDialogComponent;
  let fixture: ComponentFixture<HsiaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsiaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsiaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
