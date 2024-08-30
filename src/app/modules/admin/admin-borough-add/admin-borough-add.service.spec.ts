import { TestBed } from '@angular/core/testing';

import { AdminBoroughAddService } from './admin-borough-add.service';

describe('AdminBoroughAddService', () => {
  let service: AdminBoroughAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBoroughAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
