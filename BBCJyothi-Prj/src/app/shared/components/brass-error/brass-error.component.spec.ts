import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrassErrorComponent } from './brass-error.component';

describe('BrassErrorComponent', () => {
  let component: BrassErrorComponent;
  let fixture: ComponentFixture<BrassErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrassErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrassErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
