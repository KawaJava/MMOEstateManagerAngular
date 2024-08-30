import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminBoroughAdd } from './model/adminBoroughAdd';

@Injectable({
  providedIn: 'root'
})
export class AdminBoroughAddService {

  constructor(private http: HttpClient) { }

  createBorough(value: AdminBoroughAdd) {
    return this.http.post<AdminBoroughAdd>("/api/admin/boroughs", value);
  }
}
