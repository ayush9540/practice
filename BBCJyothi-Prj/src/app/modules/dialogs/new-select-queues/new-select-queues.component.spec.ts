import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSelectQueuesComponent } from './new-select-queues.component';

describe('NewSelectQueuesComponent', () => {
  let component: NewSelectQueuesComponent;
  let fixture: ComponentFixture<NewSelectQueuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSelectQueuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSelectQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
