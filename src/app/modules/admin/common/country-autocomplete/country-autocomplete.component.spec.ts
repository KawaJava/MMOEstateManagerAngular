import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CountryAutocompleteComponent } from './country-autocomplete.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { AdminCountryToAutocompleteService } from 'src/app/modules/common/service/AdminCountryToAutocomplete';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CountryAutocompleteComponent', () => {
  let component: CountryAutocompleteComponent;
  let fixture: ComponentFixture<CountryAutocompleteComponent>;
  let mockService: jasmine.SpyObj<AdminCountryToAutocompleteService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('AdminCountryToAutocompleteService', ['searchPlayers']);
    mockService.searchPlayers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [CountryAutocompleteComponent],
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AdminCountryToAutocompleteService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryAutocompleteComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
    mockService.searchPlayers.calls.reset();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchCountries with correct input after debounce', fakeAsync(() => {
    const countries = [{ id: 1, name: 'Hrabstwo1' }];
    mockService.searchPlayers.and.returnValue(of(countries));

    component.control.setValue('Hr');
    tick(300);
    fixture.detectChanges();

    expect(mockService.searchPlayers).toHaveBeenCalledWith('Hr');
    expect(component.filteredCountries).toEqual(countries);
  }));

  it('should call searchCountries but return empty result for unknown input', fakeAsync(() => {
    mockService.searchPlayers.and.returnValue(of([]));

    component.control.setValue('Cou');
    tick(300);
    fixture.detectChanges();

    expect(mockService.searchPlayers).toHaveBeenCalledWith('Cou');
    expect(component.filteredCountries).toEqual([]);
  }));

  it('should not call searchCountries for input shorter than 1 character', fakeAsync(() => {
    component.control.setValue('');
    tick(300);
    expect(mockService.searchPlayers).not.toHaveBeenCalled();
    expect(component.filteredCountries).toEqual([]);
  }));

  it('should handle non-string input gracefully', fakeAsync(() => {
    component.control.setValue({ id: 1 });
    tick(300);
    expect(mockService.searchPlayers).not.toHaveBeenCalled();
    expect(component.filteredCountries).toEqual([]);
  }));

  it('should handle error from searchPlayers gracefully', fakeAsync(() => {
    mockService.searchPlayers.and.returnValue(throwError(() => new Error('Service failed')));
    component.control.setValue('Fail');
    tick(300);
    expect(component.filteredCountries).toEqual([]);
  }));

  it('should return correct country name in displayCountryName', () => {
    const country = { id: 1, name: 'Country1' };
    expect(component.displayCountryName(country)).toBe('Country1');
    expect(component.displayCountryName(undefined as any)).toBe('');
  });

  it('should render required validation error when touched and invalid', fakeAsync(() => {
    component.label = 'Hrabstwo';
    component.control = new FormControl('');
    component.control.setErrors({ required: true });
    component.control.markAsTouched();
    component.control.markAsDirty();

    component.ngOnInit();
    fixture.detectChanges();
    tick(300);

    const errorEl = fixture.debugElement.query(By.css('div div'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent.trim()).toContain('Hrabstwo');
  }));

  it('should display 5 filtered countries after typing input', fakeAsync(() => {
    const countries = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Country${i + 1}`
    }));

    mockService.searchPlayers.and.returnValue(of(countries));

    component.control.setValue('C');
    tick(300);
    fixture.detectChanges();

    expect(mockService.searchPlayers).toHaveBeenCalledWith('C');
    expect(component.filteredCountries.length).toBe(5);
    expect(component.filteredCountries.map(c => c.name)).toEqual([
      'Country1', 'Country2', 'Country3', 'Country4', 'Country5'
    ]);
  }));

  it('should update filtered countries list after second input', fakeAsync(() => {
    const firstBatch = [
      { id: 1, name: 'Country1' },
      { id: 2, name: 'Country2' },
      { id: 3, name: 'Country3' },
      { id: 4, name: 'Country4' },
      { id: 5, name: 'Country5' }
    ];
    const secondBatch = [{ id: 4, name: 'Country4' }];

    mockService.searchPlayers.and.callFake((input: string) => {
      if (input === 'C') {
        return of(firstBatch);
      } else if (input === 'Country4') {
        return of(secondBatch);
      } else {
        return of([]);
      }
    });

    component.control.setValue('C');
    tick(300);
    fixture.detectChanges();
    expect(component.filteredCountries).toEqual(firstBatch);

    component.control.setValue('Country4');
    tick(300);
    fixture.detectChanges();
    expect(component.filteredCountries).toEqual(secondBatch);
  }));
});