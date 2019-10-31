import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiidDialogComponent } from './siid-dialog.component';

describe('SiidDialogComponent', () => {
  let component: SiidDialogComponent;
  let fixture: ComponentFixture<SiidDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiidDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
