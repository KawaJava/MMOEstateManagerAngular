import { TestBed } from '@angular/core/testing';

import { AdminHistoricalSheriffsService } from './admin-historical-sheriffs.service';

describe('AdminHistoricalSheriffsService', () => {
  let service: AdminHistoricalSheriffsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHistoricalSheriffsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
