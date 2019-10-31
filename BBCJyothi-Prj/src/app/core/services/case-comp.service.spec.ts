import { TestBed } from '@angular/core/testing';

import { CaseCompService } from './case-comp.service';

describe('CaseCompService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseCompService = TestBed.get(CaseCompService);
    expect(service).toBeTruthy();
  });
});
