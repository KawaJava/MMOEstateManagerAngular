import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AdminPlayer } from '../../admin-player/model/adminPlayer';
import { Page } from 'src/app/shared/page';

@Injectable({
  providedIn: 'root'
})
export class FormPlayerService {

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Array<AdminPlayer>> {
    return this.http.get<Array<AdminPlayer>>(`/api/admin/players/list`);
  }
}

