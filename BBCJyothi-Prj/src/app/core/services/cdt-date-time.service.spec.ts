import { TestBed } from '@angular/core/testing';

import { CdtDateTimeService } from './cdt-date-time.service';

describe('CdtDateTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CdtDateTimeService = TestBed.get(CdtDateTimeService);
    expect(service).toBeTruthy();
  });
});
