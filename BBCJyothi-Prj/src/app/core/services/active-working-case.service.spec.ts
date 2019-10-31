import { TestBed } from '@angular/core/testing';

import { ActiveWorkingCaseService } from './active-working-case.service';

describe('ActiveWorkingCaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveWorkingCaseService = TestBed.get(ActiveWorkingCaseService);
    expect(service).toBeTruthy();
  });
});
