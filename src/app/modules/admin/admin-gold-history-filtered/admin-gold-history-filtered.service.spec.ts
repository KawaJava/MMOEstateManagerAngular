import { TestBed } from '@angular/core/testing';

import { AdminGoldHistoryFilteredService } from './admin-gold-history-filtered.service';

describe('AdminGoldHistoryFilteredService', () => {
  let service: AdminGoldHistoryFilteredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGoldHistoryFilteredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
