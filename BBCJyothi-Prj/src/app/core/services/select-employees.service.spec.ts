import { TestBed } from '@angular/core/testing';

import { SelectEmployeesService } from './select-employees.service';

describe('SelectEmployeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectEmployeesService = TestBed.get(SelectEmployeesService);
    expect(service).toBeTruthy();
  });
});
