import { TestBed } from '@angular/core/testing';

import { SelectContactService } from './select-contact.service';

describe('SelectContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectContactService = TestBed.get(SelectContactService);
    expect(service).toBeTruthy();
  });
});
