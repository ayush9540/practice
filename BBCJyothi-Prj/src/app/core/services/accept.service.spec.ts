import { TestBed } from '@angular/core/testing';

import { AcceptService } from './accept.service';

describe('AcceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcceptService = TestBed.get(AcceptService);
    expect(service).toBeTruthy();
  });
});
