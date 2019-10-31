import { TestBed } from '@angular/core/testing';

import { CaseContactService } from './case-contact.service';

describe('CaseContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseContactService = TestBed.get(CaseContactService);
    expect(service).toBeTruthy();
  });
});
