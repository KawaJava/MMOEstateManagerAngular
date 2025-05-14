import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/page';
import { Player } from '../model/player';
import { JwtService } from 'src/app/modules/common/service/jwt.service';
import { PlayerDetails } from '../model/playerDetails';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient,
    private auth: JwtService
  ) { }

  getPlayers(page: number, size: number): Observable<Page<Player>> {
    return this.http.get<Page<Player>>(`/api/players?page=${page}&size=${size}`);
  }

  getPlayerBySlug(slug: string): Observable<Player> {
    return this.http.get<Player>(`/api/players/${slug}`);
  }

  getCurrentUser(): Observable<PlayerDetails> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<PlayerDetails>(`/api/players/me`,{ headers });
  }
}
