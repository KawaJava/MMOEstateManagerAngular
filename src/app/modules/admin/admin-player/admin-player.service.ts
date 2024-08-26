import { Injectable } from '@angular/core';
import { AdminPlayer } from './adminPlayer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from 'src/app/shared/page';

@Injectable({
  providedIn: 'root'
})
export class AdminPlayerService {

  constructor(
    private http: HttpClient
  ) { }

  getPlayers(page: number, size: number): Observable<Page<AdminPlayer>> {
    return this.http.get<Page<AdminPlayer>>(`/api/admin/players?page=${page}&size=${size}`);
  }

  getInactivePlayers(): Observable<AdminPlayer[]> {
    return this.http.get<AdminPlayer[]>(`/api/admin/players/inactive`);
  }
}
