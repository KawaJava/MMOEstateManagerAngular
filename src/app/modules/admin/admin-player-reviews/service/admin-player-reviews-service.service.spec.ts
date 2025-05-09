import { TestBed } from '@angular/core/testing';

import { AdminPlayerReviewsServiceService } from './admin-player-reviews-service.service';

describe('AdminPlayerReviewsServiceService', () => {
  let service: AdminPlayerReviewsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPlayerReviewsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
