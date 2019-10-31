import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuesHostComponent } from './queues-host.component';

describe('QueuesHostComponent', () => {
  let component: QueuesHostComponent;
  let fixture: ComponentFixture<QueuesHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuesHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuesHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
