import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogPhoneNotesResearchComponent } from './log-phone-notes-research.component';

describe('LogPhoneNotesResearchComponent', () => {
  let component: LogPhoneNotesResearchComponent;
  let fixture: ComponentFixture<LogPhoneNotesResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogPhoneNotesResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogPhoneNotesResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
