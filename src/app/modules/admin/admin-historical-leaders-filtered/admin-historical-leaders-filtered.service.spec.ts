import { TestBed } from '@angular/core/testing';

import { AdminHistoricalLeadersFilteredService } from './admin-historical-leaders-filtered.service';

describe('AdminHistoricalLeadersFilteredService', () => {
  let service: AdminHistoricalLeadersFilteredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHistoricalLeadersFilteredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
