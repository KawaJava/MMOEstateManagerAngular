import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminCountry } from './model/adminCountry';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/page';
import { AdminCountryGeneralInfo } from '../admin-country-update/model/adminCountryGeneralInfo';

@Injectable({
  providedIn: 'root'
})
export class AdminCountryService {

  constructor(private http: HttpClient) { }

  getCountries(page: number, size: number): Observable<Page<AdminCountry>> {
    return this.http.get<Page<AdminCountry>>(`/api/admin/countries?page=${page}&size=${size}`);
  }

  updateAdminCountryGeneralInfo(id: number, value: AdminCountryGeneralInfo) {
    return this.http.patch<AdminCountryGeneralInfo>("/api/admin/countries/" + id, value);
  }

  getCountry(id: number):  Observable<AdminCountryGeneralInfo> {
    return this.http.get<AdminCountryGeneralInfo>("/api/admin/countries/" + id);
  }
  
}
