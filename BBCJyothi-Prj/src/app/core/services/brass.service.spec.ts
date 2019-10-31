import { TestBed } from '@angular/core/testing';

import { BrassService } from './brass.service';

describe('BrassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrassService = TestBed.get(BrassService);
    expect(service).toBeTruthy();
  });
});
