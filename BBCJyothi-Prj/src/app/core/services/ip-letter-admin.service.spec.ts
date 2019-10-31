import { TestBed } from '@angular/core/testing';

import { IpLetterAdminService } from './ip-letter-admin.service';

describe('IpLetterAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpLetterAdminService = TestBed.get(IpLetterAdminService);
    expect(service).toBeTruthy();
  });
});
