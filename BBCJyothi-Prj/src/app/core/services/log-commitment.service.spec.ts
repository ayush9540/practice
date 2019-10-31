import { TestBed } from '@angular/core/testing';

import { LogCommitmentService } from './log-commitment.service';

describe('LogCommitmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogCommitmentService = TestBed.get(LogCommitmentService);
    expect(service).toBeTruthy();
  });
});
