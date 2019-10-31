import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIpComponent } from './view-ip.component';

describe('ViewIpComponent', () => {
  let component: ViewIpComponent;
  let fixture: ComponentFixture<ViewIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
