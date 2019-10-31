import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSiteComponent } from './select-site.component';

describe('SelectSiteComponent', () => {
  let component: SelectSiteComponent;
  let fixture: ComponentFixture<SelectSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
