import { TestBed } from '@angular/core/testing';

import { HsiaInfoService } from './hsia-info.service';

describe('HsiaInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HsiaInfoService = TestBed.get(HsiaInfoService);
    expect(service).toBeTruthy();
  });
});
