import { TestBed } from '@angular/core/testing';

import { CommHistoryService } from './comm-history.service';

describe('CommHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommHistoryService = TestBed.get(CommHistoryService);
    expect(service).toBeTruthy();
  });
});
