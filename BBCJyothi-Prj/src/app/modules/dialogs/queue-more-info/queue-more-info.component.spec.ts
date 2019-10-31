import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueMoreInfoComponent } from './queue-more-info.component';

describe('QueueMoreInfoComponent', () => {
  let component: QueueMoreInfoComponent;
  let fixture: ComponentFixture<QueueMoreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueMoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
