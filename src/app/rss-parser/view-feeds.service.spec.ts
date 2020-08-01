import { TestBed } from '@angular/core/testing';

import { ViewFeedsService } from './view-feeds.service';

describe('ViewFeedsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewFeedsService = TestBed.get(ViewFeedsService);
    expect(service).toBeTruthy();
  });
});
