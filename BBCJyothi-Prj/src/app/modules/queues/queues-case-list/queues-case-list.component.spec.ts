import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuesCaseListComponent } from './queues-case-list.component';

describe('QueuesCaseListComponent', () => {
  let component: QueuesCaseListComponent;
  let fixture: ComponentFixture<QueuesCaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuesCaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuesCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
