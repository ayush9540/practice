import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HsiaInfoComponent } from './hsia-info.component';

describe('HsiaInfoComponent', () => {
  let component: HsiaInfoComponent;
  let fixture: ComponentFixture<HsiaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsiaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsiaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
