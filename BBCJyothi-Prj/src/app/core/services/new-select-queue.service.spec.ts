import { TestBed } from '@angular/core/testing';

import { NewSelectQueueService } from './new-select-queue.service';

describe('NewSelectQueueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewSelectQueueService = TestBed.get(NewSelectQueueService);
    expect(service).toBeTruthy();
  });
});
