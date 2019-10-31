import { TestBed } from '@angular/core/testing';

import { BrassErrorService } from './brass-error.service';

describe('BrassErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrassErrorService = TestBed.get(BrassErrorService);
    expect(service).toBeTruthy();
  });
});
