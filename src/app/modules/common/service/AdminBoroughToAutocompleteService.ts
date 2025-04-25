import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdminBoroughToAutocomplete } from "../model/adminBoroughToAutocomplete";

@Injectable({
  providedIn: 'root'
})
export class AdminBoroughToAutocompleteService {

  constructor(private http: HttpClient) {}

  searchBoroughs(beginning: string): Observable<AdminBoroughToAutocomplete[]> {
    return this.http.get<AdminBoroughToAutocomplete[]>('/api/admin/boroughs/toAutocomplete', {
      params: new HttpParams().set('beginning', beginning)
    });
  }
}