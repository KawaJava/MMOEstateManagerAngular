import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminPlayerUpdate } from '../model/adminPlayerUpdate';

@Injectable({
  providedIn: 'root'
})
export class AdminPlayerUpdateService {

  constructor(
    private http: HttpClient
  ) { }

  getPlayer(id: number): Observable<AdminPlayerUpdate> {
    return this.http.get<AdminPlayerUpdate>("/api/admin/players/" + id);
  }

  savePlayer(id: number, value: AdminPlayerUpdate) {
    return this.http.put<AdminPlayerUpdate>("/api/admin/players/" + id, value);
  }

  createPlayer(value: AdminPlayerUpdate) {
    return this.http.post<AdminPlayerUpdate>("/api/admin/players", value);
  }
}
