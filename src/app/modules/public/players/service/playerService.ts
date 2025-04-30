import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/page';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayers(page: number, size: number): Observable<Page<Player>> {
    return this.http.get<Page<Player>>(`/api/players?page=${page}&size=${size}`);
  }

  getPlayerBySlug(slug: string): Observable<Player> {
    return this.http.get<Player>(`/api/players/${slug}`);
  }
}
