import { TestBed } from '@angular/core/testing';

import { AdminHistoricalLeadersService } from './admin-historical-leaders.service';

describe('AdminHistoricalLeadersService', () => {
  let service: AdminHistoricalLeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHistoricalLeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
