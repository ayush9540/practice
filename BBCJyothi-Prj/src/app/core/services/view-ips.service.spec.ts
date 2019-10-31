import { TestBed } from '@angular/core/testing';

import { ViewIpsService } from './view-ips.service';

describe('ViewIpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewIpsService = TestBed.get(ViewIpsService);
    expect(service).toBeTruthy();
  });
});
