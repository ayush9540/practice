import { TestBed } from '@angular/core/testing';

import { SelectSiteService } from './select-site.service';

describe('SelectSiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectSiteService = TestBed.get(SelectSiteService);
    expect(service).toBeTruthy();
  });
});
