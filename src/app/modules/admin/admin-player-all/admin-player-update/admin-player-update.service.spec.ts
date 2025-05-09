import { TestBed } from '@angular/core/testing';

import { AdminPlayerUpdateService } from './admin-player-update.service';

describe('AdminPlayerUpdateService', () => {
  let service: AdminPlayerUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPlayerUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
