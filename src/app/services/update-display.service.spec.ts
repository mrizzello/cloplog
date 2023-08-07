import { TestBed } from '@angular/core/testing';

import { UpdateDisplayService } from './update-display.service';

describe('UpdateDisplayService', () => {
  let service: UpdateDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
