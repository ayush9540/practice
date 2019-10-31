import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSiteComponent } from './case-site.component';

describe('CaseSiteComponent', () => {
  let component: CaseSiteComponent;
  let fixture: ComponentFixture<CaseSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
