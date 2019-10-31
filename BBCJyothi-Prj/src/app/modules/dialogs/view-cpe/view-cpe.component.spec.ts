import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCpeComponent } from './view-cpe.component';

describe('ViewCpeComponent', () => {
  let component: ViewCpeComponent;
  let fixture: ComponentFixture<ViewCpeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCpeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
