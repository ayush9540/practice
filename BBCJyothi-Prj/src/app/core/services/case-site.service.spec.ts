import { TestBed } from '@angular/core/testing';

import { CaseSiteService } from './case-site.service';

describe('CaseSiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseSiteService = TestBed.get(CaseSiteService);
    expect(service).toBeTruthy();
  });
});
