import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminPlayerUpdate } from './model/AdminPlayerUpdate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPlayerUpdateService {

  constructor(
    private http: HttpClient
  ) { }

  getPlayer(id: number): Observable<AdminPlayerUpdate> {
    return this.http.get<AdminPlayerUpdate>("/api/admin/players/" + id)
  }
}
