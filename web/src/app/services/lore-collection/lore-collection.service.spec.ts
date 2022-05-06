import { TestBed } from '@angular/core/testing';

import { LoreCollectionService } from './lore-collection.service';

describe('LoreCollectionService', () => {
  let service: LoreCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoreCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
