import { TestBed } from '@angular/core/testing';

import { ServiceInfoService } from './service-info.service';

describe('ServiceInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceInfoService = TestBed.get(ServiceInfoService);
    expect(service).toBeTruthy();
  });
});
