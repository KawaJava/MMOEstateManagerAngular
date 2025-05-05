import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "src/app/shared/page";
import { Country } from "../model/country";
import { CountryDetails } from "../model/countryDetails";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries(page: number, size: number): Observable<Page<Country>> {
    return this.http.get<Page<Country>>(`/api/countries?page=${page}&size=${size}`);
  }

  getCountryBySlug(slug: string): Observable<CountryDetails> {
    return this.http.get<CountryDetails>(`/api/countries/${slug}/details`);
  }
}