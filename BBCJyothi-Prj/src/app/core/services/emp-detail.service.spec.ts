import { TestBed } from '@angular/core/testing';

import { EmpDetailService } from './emp-detail.service';

describe('EmpDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpDetailService = TestBed.get(EmpDetailService);
    expect(service).toBeTruthy();
  });
});
