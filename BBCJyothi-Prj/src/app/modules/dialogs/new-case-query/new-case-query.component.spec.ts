import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaseQueryComponent } from './new-case-query.component';

describe('NewCaseQueryComponent', () => {
  let component: NewCaseQueryComponent;
  let fixture: ComponentFixture<NewCaseQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCaseQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaseQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
