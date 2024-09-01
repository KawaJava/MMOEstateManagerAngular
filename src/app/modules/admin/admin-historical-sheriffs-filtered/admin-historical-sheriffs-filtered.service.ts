import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminHistoricalSheriff } from '../admin-historical-sheriffs/model/adminHistoricalSheriff';
import { map, Observable } from 'rxjs';
import { Page } from 'src/app/shared/page';
import { AdminCountry } from '../admin-country/model/adminCountry';
import { HistoricalSheriffsFilteredDto } from '../admin-historical-sheriffs/model/historicalSheriffsFilteredDto';

@Injectable({
  providedIn: 'root'
})
export class AdminHistoricalSheriffsFilteredService {

  constructor(private http: HttpClient) { }

  getFilteredData(value: HistoricalSheriffsFilteredDto): Observable<Array<AdminHistoricalSheriff>> {
    return this.http.post<Array<AdminHistoricalSheriff>>(`/api/admin/historical-sheriffs/filtered`, value);
  }
  

  getCountries(): Observable<Array<AdminCountry>> {
    return this.http.get<Array<AdminCountry>>(`/api/admin/countries/list`);
  }

}
