import { TestBed } from '@angular/core/testing';

import { TimelinesService } from './timelines.service';

describe('TimelinesService', () => {
  let service: TimelinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
