import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityAddInfoComponent } from './activity-add-info.component';

describe('ActivityAddInfoComponent', () => {
  let component: ActivityAddInfoComponent;
  let fixture: ComponentFixture<ActivityAddInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityAddInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityAddInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
