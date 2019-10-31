import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SirCreationDialogComponent } from './sir-creation-dialog.component';

describe('SirCreationDialogComponent', () => {
  let component: SirCreationDialogComponent;
  let fixture: ComponentFixture<SirCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SirCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SirCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
