import { TestBed } from '@angular/core/testing';

import { CaseInfoService } from './case-info.service';

describe('CaseInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseInfoService = TestBed.get(CaseInfoService);
    expect(service).toBeTruthy();
  });
});
