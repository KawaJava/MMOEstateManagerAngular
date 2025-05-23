import { Component, OnInit } from '@angular/core';
import { CountryService } from '../service/countryService';
import { CountryDetails } from '../model/countryDetails';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  country!: CountryDetails;
  clanNames: string[] = [];
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.countryService.getCountryBySlug(slug).subscribe({
        next: (country) => {
          this.country = country;
          this.clanNames = Object.keys(this.country.clanPercentage || {});
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
    }
  }
}
