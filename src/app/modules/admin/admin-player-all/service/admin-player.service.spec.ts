import { TestBed } from '@angular/core/testing';

import { AdminPlayerService } from '../service/admin-player.service';

describe('AdminPlayerService', () => {
  let service: AdminPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
