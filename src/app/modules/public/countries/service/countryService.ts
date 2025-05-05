import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "src/app/shared/page";
import { Country } from "../model/country";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries(page: number, size: number): Observable<Page<Country>> {
    return this.http.get<Page<Country>>(`/api/countries?page=${page}&size=${size}`);
  }

  getCountriesBySlug(slug: string): Observable<Country> {
    return this.http.get<Country>(`/api/countries/${slug}`);
  }
}