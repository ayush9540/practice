import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWipbinComponent } from './new-wipbin.component';

describe('NewWipbinComponent', () => {
  let component: NewWipbinComponent;
  let fixture: ComponentFixture<NewWipbinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWipbinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWipbinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
