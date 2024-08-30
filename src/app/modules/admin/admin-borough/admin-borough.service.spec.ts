import { TestBed } from '@angular/core/testing';

import { AdminBoroughService } from './admin-borough.service';

describe('AdminBoroughService', () => {
  let service: AdminBoroughService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBoroughService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
