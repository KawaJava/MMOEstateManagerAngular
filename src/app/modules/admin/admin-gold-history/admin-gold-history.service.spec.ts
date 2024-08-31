import { TestBed } from '@angular/core/testing';

import { AdminGoldHistoryService } from './admin-gold-history.service';

describe('AdminGoldHistoryService', () => {
  let service: AdminGoldHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGoldHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
