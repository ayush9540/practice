import { TestBed } from '@angular/core/testing';

import { CaseQueryService } from './case-query.service';

describe('CaseQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseQueryService = TestBed.get(CaseQueryService);
    expect(service).toBeTruthy();
  });
});
