import { TestBed } from '@angular/core/testing';

import { YankService } from './yank.service';

describe('YankService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YankService = TestBed.get(YankService);
    expect(service).toBeTruthy();
  });
});
