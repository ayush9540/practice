import { TestBed } from '@angular/core/testing';

import { QueueMoreInfoService } from './queue-more-info.service';

describe('QueueMoreInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueueMoreInfoService = TestBed.get(QueueMoreInfoService);
    expect(service).toBeTruthy();
  });
});
