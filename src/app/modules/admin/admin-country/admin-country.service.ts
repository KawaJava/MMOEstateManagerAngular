import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminCountry } from './model/adminCountry';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/page';

@Injectable({
  providedIn: 'root'
})
export class AdminCountryService {

  constructor(private http: HttpClient) { }

  getCountries(page: number, size: number): Observable<Page<AdminCountry>> {
    return this.http.get<Page<AdminCountry>>(`/api/admin/countries?page=${page}&size=${size}`);
  }
}
