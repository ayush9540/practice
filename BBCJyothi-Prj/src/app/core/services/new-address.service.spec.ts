import { TestBed } from '@angular/core/testing';

import { NewAddressService } from './new-address.service';

describe('NewAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewAddressService = TestBed.get(NewAddressService);
    expect(service).toBeTruthy();
  });
});
