import { TestBed } from '@angular/core/testing';

import { LogCounterService } from './log-counter.service';

describe('LogCounterService', () => {
  let service: LogCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
