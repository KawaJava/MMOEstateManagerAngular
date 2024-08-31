import { Injectable } from '@angular/core';
import { GoldHistoryFilteredDto } from './model/goldHistoryFilteredDto';
import { AdminGoldHistory } from '../admin-gold-history/model/adminGoldHistory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGoldHistoryFilteredService {

  constructor(private http: HttpClient) { }

  getFilteredData(value: GoldHistoryFilteredDto): Observable<Array<AdminGoldHistory>> {
    return this.http.post<Array<AdminGoldHistory>>(`/api/admin/history-golds/filtered`, value);
  }
}
