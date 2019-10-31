import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WipbinsComponent } from './wipbins.component';

describe('WipbinsComponent', () => {
  let component: WipbinsComponent;
  let fixture: ComponentFixture<WipbinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WipbinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WipbinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
