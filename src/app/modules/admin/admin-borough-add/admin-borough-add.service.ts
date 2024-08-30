import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminBoroughAdd } from './model/adminBoroughAdd';
import { AdminBoroughGeneralInfo } from '../admin-borough-update/model/adminBoroughGeneralInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminBoroughAddService {

  constructor(private http: HttpClient) { }

  createBorough(value: AdminBoroughAdd) {
    return this.http.post<AdminBoroughAdd>("/api/admin/boroughs", value);
  }

  updateAdminBoroughGeneralInfo(id: number, value: AdminBoroughGeneralInfo) {
    return this.http.patch<AdminBoroughGeneralInfo>("/api/admin/boroughs/" + id, value);
  }

  getBorough(id: number): Observable<AdminBoroughGeneralInfo> {
    return this.http.get<AdminBoroughAdd>("/api/admin/boroughs/" + id);
  }

  changeLeader(boroughId: number, leaderId: number): Observable<number> {
    return this.http.patch<number>("/api/admin/boroughs/" + boroughId + "/changeLeader/" + leaderId, {});
  }

}
