import { TestBed } from '@angular/core/testing';

import { AdminCountryService } from './admin-country.service';

describe('AdminCountryService', () => {
  let service: AdminCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
