import { TestBed } from '@angular/core/testing';

import { AdminHistoricalSheriffsFilteredService } from './admin-historical-sheriffs-filtered.service';

describe('AdminHistoricalSheriffsFilteredService', () => {
  let service: AdminHistoricalSheriffsFilteredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHistoricalSheriffsFilteredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
