import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminHistoricalSheriff } from './model/adminHistoricalSheriff';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/page';

@Injectable({
  providedIn: 'root'
})
export class AdminHistoricalSheriffsService {

  constructor(private http: HttpClient) { }

  getHistoricalSheriffs(page: number, size: number): Observable<Page<AdminHistoricalSheriff>> {
    return this.http.get<Page<AdminHistoricalSheriff>>(`/api/admin/historical-sheriffs?page=${page}&size=${size}`);
  }

}
