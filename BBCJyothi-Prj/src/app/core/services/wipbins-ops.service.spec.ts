import { TestBed } from '@angular/core/testing';

import { WipbinsOpsService } from './wipbins-ops.service';

describe('WipbinsOpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WipbinsOpsService = TestBed.get(WipbinsOpsService);
    expect(service).toBeTruthy();
  });
});
