import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityStatusNoteComponent } from './activity-status-note.component';

describe('ActivityStatusNoteComponent', () => {
  let component: ActivityStatusNoteComponent;
  let fixture: ComponentFixture<ActivityStatusNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityStatusNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityStatusNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
