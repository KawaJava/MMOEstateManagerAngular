import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, switchMap } from 'rxjs';
import { AdminCountryToAutocomplete } from 'src/app/modules/common/model/adminCountryToAutocomplete';
import { AdminCountryToAutocompleteService } from 'src/app/modules/common/service/AdminCountryToAutocomplete';

@Component({
  selector: 'app-players-is-country',
  templateUrl: './players-is-country.component.html',
  styleUrls: ['./players-is-country.component.scss']
})
export class PlayersIsCountryComponent implements OnInit {

  countryControl = new FormControl();
  filteredCountries: Observable<AdminCountryToAutocomplete[]> = new Observable();
  selectedCountryId: number | null = null;

  constructor(
    private countryService: AdminCountryToAutocompleteService
  ) { }

  ngOnInit(): void {
      this.filteredCountries = this.countryControl.valueChanges.pipe(
        startWith(''),
        switchMap(value => this.countryService.searchPlayers(value || ''))
      )
      this.countryControl.valueChanges.subscribe(value => {
        const borough = typeof value === 'string'
          ? null
          : value;
  
        // if (borough && borough.id) {
        //   this.loadGoldStats(borough.id);
        // }
      }
    )}

  displayCountryName = (country: AdminCountryToAutocomplete): string => {
    return country?.name || '';
  };

}
