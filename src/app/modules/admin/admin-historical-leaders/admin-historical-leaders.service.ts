import { Injectable } from '@angular/core';
import { AdminHistoricalLeader } from './model/adminHistoricalLeader';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/page';

@Injectable({
  providedIn: 'root'
})
export class AdminHistoricalLeadersService {

  constructor(private http: HttpClient) { }

  getHistoricalLeaders(page: number, size: number): Observable<Page<AdminHistoricalLeader>> {
    return this.http.get<Page<AdminHistoricalLeader>>(`/api/admin/historical-leaders?page=${page}&size=${size}`);
  }
}
