import { TestBed } from '@angular/core/testing';

import { MoveTaskService } from './move-task.service';

describe('MoveTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoveTaskService = TestBed.get(MoveTaskService);
    expect(service).toBeTruthy();
  });
});
