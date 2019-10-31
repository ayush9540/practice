import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCaseComponent } from './create-new-case.component';

describe('CreateNewCaseComponent', () => {
  let component: CreateNewCaseComponent;
  let fixture: ComponentFixture<CreateNewCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
