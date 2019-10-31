import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommHistoryComponent } from './comm-history.component';

describe('CommHistoryComponent', () => {
  let component: CommHistoryComponent;
  let fixture: ComponentFixture<CommHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
