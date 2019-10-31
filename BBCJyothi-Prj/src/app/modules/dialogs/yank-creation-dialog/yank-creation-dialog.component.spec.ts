import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YankCreationDialogComponent } from './yank-creation-dialog.component';

describe('YankCreationDialogComponent', () => {
  let component: YankCreationDialogComponent;
  let fixture: ComponentFixture<YankCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YankCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YankCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
