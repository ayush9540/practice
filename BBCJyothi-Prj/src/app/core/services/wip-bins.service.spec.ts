import { TestBed } from '@angular/core/testing';

import { WipBinsService } from './wip-bins.service';

describe('WipBinsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WipBinsService = TestBed.get(WipBinsService);
    expect(service).toBeTruthy();
  });
});
