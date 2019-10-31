import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevCaseComponent } from './prev-case.component';

describe('PrevCaseComponent', () => {
  let component: PrevCaseComponent;
  let fixture: ComponentFixture<PrevCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
