import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { GoldStat } from "./model/goldStat";
import { PlayerBoroughCount } from "./model/playerBoroughCount";
import { ClanShare } from "./model/clanShare";

@Injectable({
    providedIn: 'root'
  })
  export class ChartStatsService {
    constructor(private http: HttpClient) {}
  
    getGoldStatsByBorough(boroughId: number): Observable<GoldStat[]> {
      return this.http.get<GoldStat[]>(`/api/charts/gold-in-borough/${boroughId}`).pipe(
        tap(data => console.log('Gold stats (via tap):', data))
      );
    }
    getPlayersInCountry(countryId: number): Observable<PlayerBoroughCount[]> {
      return this.http.get<PlayerBoroughCount[]>(`/api/charts/player-boroughs-in-country/${countryId}`).pipe(
        tap(data => console.log('Player stats (via tap):', data))
      );
    }
    getClansInCountry(countryId: number): Observable<ClanShare[]> {
      return this.http.get<ClanShare[]>(`/api/charts/clans-in-country/${countryId}`).pipe(
        tap(data => console.log('Clan stats (via tap):', data))
      );
    }
  }
  