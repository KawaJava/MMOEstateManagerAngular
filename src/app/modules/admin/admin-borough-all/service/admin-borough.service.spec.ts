import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminBoroughService } from './admin-borough.service';
import { AdminBorough } from '../model/adminBorough';
import { Page } from 'src/app/shared/page';

describe('AdminBoroughService', () => {
  let service: AdminBoroughService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminBoroughService]
    });

    service = TestBed.inject(AdminBoroughService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch boroughs with correct parameters', () => {

    const mockBorough: AdminBorough = {
      id: 1,
      name: 'Central Borough',
      slug: 'central-borough',
      countryId: 100,
      actualLeaderId: 50,
      leaderStartDate: new Date('2023-01-01T00:00:00Z'),
      actualGold: 5000,
      goldAddedBy: 10,
      dateAdded: new Date('2022-12-31T12:00:00Z'),
      emailSend: true
    };

    const mockPage: Page<AdminBorough> = {
      content: [mockBorough],
      totalElements: 1
    };

    service.getBoroughs(0, 10).subscribe(response => {
      expect(response).toEqual(mockPage);
      expect(response.content[0].name).toBe('Central Borough');
      expect(response.content[0].leaderStartDate instanceof Date).toBe(true);
    });

    const req = httpMock.expectOne('/api/admin/boroughs?page=0&size=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockPage);
  });

  it('should handle HTTP error gracefully', () => {
    const errorMsg = 'Internal Server Error';

    service.getBoroughs(0, 10).subscribe({
      next: () => fail('Expected an error, not boroughs'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne('/api/admin/boroughs?page=0&size=10');
    expect(req.request.method).toBe('GET');

    req.flush(errorMsg, { status: 500, statusText: 'Server Error' });
  });

  it('should fetch correct page with requested size (10 of 15 records)', () => {
    const mockBoroughs: AdminBorough[] = [];

    for (let i = 1; i <= 10; i++) {
      mockBoroughs.push({
        id: i,
        name: `Borough ${i}`,
        slug: `borough-${i}`,
        countryId: 1,
        actualLeaderId: 1,
        leaderStartDate: new Date('2023-01-01T00:00:00Z'),
        actualGold: 100 * i,
        goldAddedBy: 1,
        dateAdded: new Date('2022-01-01T00:00:00Z'),
        emailSend: false
      });
    }

    const mockPage: Page<AdminBorough> = {
      content: mockBoroughs,
      totalElements: 15
    };

    service.getBoroughs(0, 10).subscribe(response => {
      expect(response.content.length).toBe(10);
      expect(response.totalElements).toBe(15);
      expect(response.content[0].id).toBe(1);
      expect(response.content[9].id).toBe(10);
    });

    const req = httpMock.expectOne('/api/admin/boroughs?page=0&size=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockPage);
  });

});