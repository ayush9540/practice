import { TestBed } from '@angular/core/testing';

import { RejectForwardService } from './reject-forward.service';

describe('RejectForwardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RejectForwardService = TestBed.get(RejectForwardService);
    expect(service).toBeTruthy();
  });
});
