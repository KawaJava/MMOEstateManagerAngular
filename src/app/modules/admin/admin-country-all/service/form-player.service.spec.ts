import { TestBed } from '@angular/core/testing';

import { FormPlayerService } from '../model/form-player.service';

describe('FormPlayerService', () => {
  let service: FormPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
