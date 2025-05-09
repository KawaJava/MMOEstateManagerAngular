import { Injectable } from '@angular/core';
import { AdminHistoricalLeader } from '../admin-historical-leaders/model/adminHistoricalLeader';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoricalLeadersFilteredDto } from '../admin-historical-leaders/model/historicalLeadersFilteredDto';
import { AdminBorough } from '../admin-borough-all/model/adminBorough';

@Injectable({
  providedIn: 'root'
})
export class AdminHistoricalLeadersFilteredService {

  constructor(private http: HttpClient) { }

  getFilteredData(value: HistoricalLeadersFilteredDto): Observable<Array<AdminHistoricalLeader>> {
    return this.http.post<Array<AdminHistoricalLeader>>(`/api/admin/historical-leaders/filtered`, value);
  }

  getBoroughs(): Observable<Array<AdminBorough>> {
    return this.http.get<Array<AdminBorough>>(`/api/admin/boroughs/list`);
  }
}
