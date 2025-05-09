import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/page';
import { AdminBorough } from '../model/adminBorough';

@Injectable({
  providedIn: 'root'
})
export class AdminBoroughService {

  constructor(private http: HttpClient) { }

  getBoroughs(page: number, size: number): Observable<Page<AdminBorough>> {
    return this.http.get<Page<AdminBorough>>(`/api/admin/boroughs?page=${page}&size=${size}`);
  }
}
