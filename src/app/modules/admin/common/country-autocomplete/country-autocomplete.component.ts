import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { AdminCountryToAutocomplete } from 'src/app/modules/common/model/adminCountryToAutocomplete';
import { AdminCountryToAutocompleteService } from 'src/app/modules/common/service/AdminCountryToAutocomplete';

@Component({
  selector: 'app-country-autocomplete',
  templateUrl: './country-autocomplete.component.html',
  styleUrls: ['./country-autocomplete.component.scss']
})
export class CountryAutocompleteComponent implements OnInit {

  @Input() label: string = 'Hrabstwo';
  @Input() control!: FormControl;

  filteredCountries: AdminCountryToAutocomplete[] = [];

  constructor(private countryService: AdminCountryToAutocompleteService) { }

  ngOnInit(): void {
    this.control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        const input = typeof value === 'string' ? value : '';
        return input.length >= 1
          ? this.countryService.searchPlayers(input)
          : [];
      })
    ).subscribe({
      next: countries => this.filteredCountries = countries,
      error: () => this.filteredCountries = []
    });
  }

  displayCountryName = (country: AdminCountryToAutocomplete): string => {
    return country?.name || '';
  };

}
