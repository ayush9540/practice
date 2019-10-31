import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogCommitmentComponent } from './log-commitment.component';

describe('LogCommitmentComponent', () => {
  let component: LogCommitmentComponent;
  let fixture: ComponentFixture<LogCommitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogCommitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
