import { TestBed } from '@angular/core/testing';

import { SiidService } from './siid.service';

describe('SiidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiidService = TestBed.get(SiidService);
    expect(service).toBeTruthy();
  });
});
