import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitmentLogComponent } from './commitment-log.component';

describe('CommitmentLogComponent', () => {
  let component: CommitmentLogComponent;
  let fixture: ComponentFixture<CommitmentLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitmentLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitmentLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
