import { Injectable } from '@angular/core';
import { AdminGoldHistory } from './model/adminGoldHistory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/page';

@Injectable({
  providedIn: 'root'
})
export class AdminGoldHistoryService {

  constructor(private http: HttpClient) { }

  getGoldHistory(page: number, size: number): Observable<Page<AdminGoldHistory>> {
    return this.http.get<Page<AdminGoldHistory>>(`/api/admin/history-golds?page=${page}&size=${size}`);
  }
}
