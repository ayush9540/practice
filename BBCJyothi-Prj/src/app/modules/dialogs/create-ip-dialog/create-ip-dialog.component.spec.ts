import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIpDialogComponent } from './create-ip-dialog.component';

describe('CreateIpDialogComponent', () => {
  let component: CreateIpDialogComponent;
  let fixture: ComponentFixture<CreateIpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
