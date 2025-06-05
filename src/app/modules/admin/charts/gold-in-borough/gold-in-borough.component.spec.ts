import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GoldInBoroughComponent } from './gold-in-borough.component';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminBoroughToAutocompleteService } from 'src/app/modules/common/service/AdminBoroughToAutocompleteService';
import { ChartStatsService } from './ChartStatsService';

describe('GoldInBoroughComponent', () => {
  let component: GoldInBoroughComponent;
  let fixture: ComponentFixture<GoldInBoroughComponent>;
  let boroughServiceSpy: jasmine.SpyObj<AdminBoroughToAutocompleteService>;
  let goldServiceSpy: jasmine.SpyObj<ChartStatsService>;

  beforeEach(async () => {
    boroughServiceSpy = jasmine.createSpyObj('AdminBoroughToAutocompleteService', ['searchBoroughs']);
    goldServiceSpy = jasmine.createSpyObj('ChartStatsService', ['getGoldStatsByBorough']);

    await TestBed.configureTestingModule({
      declarations: [GoldInBoroughComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AdminBoroughToAutocompleteService, useValue: boroughServiceSpy },
        { provide: ChartStatsService, useValue: goldServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldInBoroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize filteredBoroughs and subscribe to valueChanges', fakeAsync(() => {
      const mockResults = [{ id: 1, name: 'Test Gmina 1', slug: 'testgmina-1' },
        { id: 2, name: 'Test Gmina 2', slug: 'testgmina-2' }
      ];
      boroughServiceSpy.searchBoroughs.and.returnValue(of(mockResults));

      component.ngOnInit();
      component.boroughControl.setValue('Test');
      tick();

      component.filteredBoroughs.subscribe(results => {
        expect(results).toEqual(mockResults);
      });
    }));
  });

  describe('loadGoldStats', () => {
    it('should update chartData and call generateChart with correct data', () => {
      const statsMock = [
        { date: '2023-01-01T10:00:00', amount: 10 },
        { date: '2023-01-02T12:00:00', amount: 20 }
      ];
      goldServiceSpy.getGoldStatsByBorough.and.returnValue(of(statsMock));
      spyOn(component, 'generateChart');

      component.loadGoldStats(1);

      expect(goldServiceSpy.getGoldStatsByBorough).toHaveBeenCalledWith(1);
      expect(component.chartData.labels?.length).toBe(2);
      expect(component.chartData.datasets[0].data).toEqual([10, 20]);
      expect(component.generateChart).toHaveBeenCalled();
    });

    it('should handle empty dataset gracefully', () => {
      goldServiceSpy.getGoldStatsByBorough.and.returnValue(of([]));
      spyOn(component, 'generateChart');

      component.loadGoldStats(999);

      expect(component.chartData.labels).toEqual([]);
      expect(component.chartData.datasets[0].data).toEqual([]);
      expect(component.generateChart).toHaveBeenCalledWith([], []);
    });

  });

  describe('formatDateTime', () => {
    it('should format ISO date string correctly', () => {
      const result = component['formatDateTime']('2023-01-01T05:06:07Z');

      const expectedDate = new Date('2023-01-01T05:06:07Z');
      const pad = (n: number) => n.toString().padStart(2, '0');

      const formatted = `${pad(expectedDate.getDate())}.${pad(expectedDate.getMonth() + 1)}.${expectedDate.getFullYear()} ${pad(expectedDate.getHours())}:${pad(expectedDate.getMinutes())}:${pad(expectedDate.getSeconds())}`;

      expect(result).toBe(formatted);
    });


    it('should return string with NaN for invalid date', () => {
      const result = component['formatDateTime']('not-a-date');
      expect(result).toContain('NaN');
    });
  });

  describe('displayBoroughName', () => {
    it('should return borough name if present', () => {
      expect(component.displayBoroughName({ id: 1, name: 'Gmina X', slug: 'gmina-x' })).toBe('Gmina X');
    });

    it('should return empty string if borough is null or undefined', () => {
      expect(component.displayBoroughName(null as any)).toBe('');
      expect(component.displayBoroughName(undefined as any)).toBe('');
    });
  });

  describe('generateChart', () => {
    it('should destroy existing chart if exists and create new chart', () => {
      const destroySpy = jasmine.createSpy();
      component.chart = { destroy: destroySpy } as any;

      component['barCanvas'] = {
        nativeElement: document.createElement('canvas')
      } as any;

      const labels = ['01.01.2023'];
      const data = [100];

      component.generateChart(labels, data);
      expect(destroySpy).toHaveBeenCalled();
      expect(component.chart).toBeDefined();
    });
  });
});
