import { TestBed } from '@angular/core/testing';

import { CreateIpLetterService } from './create-ip-letter.service';

describe('CreateIpLetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateIpLetterService = TestBed.get(CreateIpLetterService);
    expect(service).toBeTruthy();
  });
});
