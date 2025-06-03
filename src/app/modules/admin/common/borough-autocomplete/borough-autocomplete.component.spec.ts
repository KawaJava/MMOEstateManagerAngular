import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BoroughAutocompleteComponent } from './borough-autocomplete.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';
import { AdminBoroughToAutocompleteService } from 'src/app/modules/common/service/AdminBoroughToAutocompleteService';


describe('BoroughAutocompleteComponent', () => {
  let component: BoroughAutocompleteComponent;
  let fixture: ComponentFixture<BoroughAutocompleteComponent>;
  let mockService: jasmine.SpyObj<AdminBoroughToAutocompleteService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('AdminBoroughToAutocompleteService', ['searchBoroughs']);
    mockService.searchBoroughs.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [BoroughAutocompleteComponent],
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: AdminBoroughToAutocompleteService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BoroughAutocompleteComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
    mockService.searchBoroughs.calls.reset();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchBoroughs with correct input after debounce', fakeAsync(() => {
    const boroughs = [{ id: 1, name: 'Borough1', slug: 'borough-1' }];
    mockService.searchBoroughs.and.returnValue(of(boroughs));

    component.control.setValue('Bor');
    tick(300);
    fixture.detectChanges();

    expect(mockService.searchBoroughs).toHaveBeenCalledWith('Bor');
    expect(component.filteredBoroughs).toEqual(boroughs);
  }));

  it('should not call searchBoroughs for input shorter than 1 character', fakeAsync(() => {
    component.control.setValue('');
    tick(300);
    expect(mockService.searchBoroughs).not.toHaveBeenCalled();
    expect(component.filteredBoroughs).toEqual([]);
  }));

  it('should handle non-string input gracefully', fakeAsync(() => {
    component.control.setValue({ id: 1 });
    tick(300);
    expect(mockService.searchBoroughs).not.toHaveBeenCalled();
    expect(component.filteredBoroughs).toEqual([]);
  }));

  it('should handle error from searchBoroughs gracefully', fakeAsync(() => {
    mockService.searchBoroughs.and.returnValue(throwError(() => new Error('Service failed')));
    component.control.setValue('Fail');
    tick(300);
    expect(component.filteredBoroughs).toEqual([]);
  }));

  it('should return correct borough name in displayBoroughName', () => {
    component.filteredBoroughs = [
      { id: 1, name: 'Borough1', slug: 'borough-1' },
      { id: 2, name: 'Borough2', slug: 'borough-2' }
    ];

    expect(component.displayBoroughName(2)).toBe('Borough2');
    expect(component.displayBoroughName(3)).toBe('');
  });

  it('should render required validation error when touched and invalid', fakeAsync(() => {
    component.label = 'Gmina';
    component.control = new FormControl('');
    component.control.setErrors({ required: true });
    component.control.markAsTouched();
    component.control.markAsDirty();

    component.ngOnInit();
    fixture.detectChanges();
    tick(300);

    const errorEl = fixture.debugElement.query(By.css('div div'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent.trim()).toContain('Gmina');
  }));

  it('should display 5 filtered boroughs after typing input', fakeAsync(() => {
    const boroughs = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Borough${i + 1}`,
      slug: `borough-${i + 1}`
    }));

    mockService.searchBoroughs.and.returnValue(of(boroughs));

    component.control.setValue('B');
    tick(300);
    fixture.detectChanges();

    expect(mockService.searchBoroughs).toHaveBeenCalledWith('B');
    expect(component.filteredBoroughs.length).toBe(5);
    expect(component.filteredBoroughs.map(p => p.name)).toEqual([
      'Borough1', 'Borough2', 'Borough3', 'Borough4', 'Borough5'
    ]);
  }));

  it('should update filtered boroughs list after second input', fakeAsync(() => {
    const firstBatch = [
      { id: 1, name: 'Borough1', slug: 'borough-1' },
      { id: 2, name: 'Borough2', slug: 'borough-2' },
      { id: 3, name: 'Borough3', slug: 'borough-3' },
      { id: 4, name: 'Borough4', slug: 'borough-4' },
      { id: 5, name: 'Borough5', slug: 'borough-5' },
    ];
    const secondBatch = [{ id: 7, name: 'Borough7', slug: 'borough-7' }];

    mockService.searchBoroughs.and.callFake((input: string) => {
      if (input === 'B') {
        return of(firstBatch).pipe(delay(100));
      } else if (input === 'Borough7') {
        return of(secondBatch).pipe(delay(100));
      } else {
        return of([]).pipe(delay(100));
      }
    });

    component.control.setValue('B');
    tick(300);
    tick(100);
    fixture.detectChanges();
    expect(component.filteredBoroughs).toEqual(firstBatch);

    component.control.setValue('Borough7');
    tick(300);
    tick(100);
    fixture.detectChanges();
    expect(component.filteredBoroughs).toEqual([{ id: 7, name: 'Borough7', slug: 'borough-7' }]);
  }));

  it('should call searchBoroughs with empty string on init', () => {
    const boroughs = [{ id: 1, name: 'Initial', slug: 'initial' }];
    mockService.searchBoroughs.and.returnValue(of(boroughs));

    component.ngOnInit();
    expect(mockService.searchBoroughs).toHaveBeenCalledWith('');
    expect(component.filteredBoroughs).toEqual(boroughs);
  });
  it('should handle error on initial searchBoroughs call', () => {
    mockService.searchBoroughs.and.returnValue(throwError(() => new Error('init error')));
    component.ngOnInit();
    expect(component.filteredBoroughs).toEqual([]);
  });
  it('should return empty string from displayBoroughName when list is empty', () => {
    component.filteredBoroughs = [];
    expect(component.displayBoroughName(1)).toBe('');
  });

});
