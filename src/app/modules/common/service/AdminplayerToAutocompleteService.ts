import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AdminPlayerToAutocomplete {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminplayerToAutocompleteService {

  constructor(private http: HttpClient) {}

  searchPlayers(beginning: string): Observable<AdminPlayerToAutocomplete[]> {
    return this.http.get<AdminPlayerToAutocomplete[]>('/api/admin/players/toAutocomplete', {
      params: new HttpParams().set('beginning', beginning)
    });
  }
}
