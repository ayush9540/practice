import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQueuesComponent } from './select-queues.component';

describe('SelectQueuesComponent', () => {
  let component: SelectQueuesComponent;
  let fixture: ComponentFixture<SelectQueuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectQueuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
