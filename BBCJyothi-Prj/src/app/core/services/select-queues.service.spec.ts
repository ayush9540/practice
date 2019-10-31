import { TestBed } from '@angular/core/testing';

import { SelectQueuesService } from './select-queues.service';

describe('SelectQueuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectQueuesService = TestBed.get(SelectQueuesService);
    expect(service).toBeTruthy();
  });
});
