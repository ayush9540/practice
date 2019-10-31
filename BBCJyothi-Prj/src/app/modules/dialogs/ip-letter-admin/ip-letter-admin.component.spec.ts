import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpLetterAdminComponent } from './ip-letter-admin.component';

describe('IpLetterAdminComponent', () => {
  let component: IpLetterAdminComponent;
  let fixture: ComponentFixture<IpLetterAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpLetterAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpLetterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
