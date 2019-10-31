import { TestBed } from '@angular/core/testing';

import { BgateErrorService } from './bgate-error.service';

describe('BgateErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BgateErrorService = TestBed.get(BgateErrorService);
    expect(service).toBeTruthy();
  });
});
