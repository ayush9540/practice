import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseTaskComponent } from './close-task.component';

describe('CloseTaskComponent', () => {
  let component: CloseTaskComponent;
  let fixture: ComponentFixture<CloseTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
