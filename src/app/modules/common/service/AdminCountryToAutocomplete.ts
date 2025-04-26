import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdminCountryToAutocomplete } from "../model/adminCountryToAutocomplete";

@Injectable({
  providedIn: 'root'
})
export class AdminCountryToAutocompleteService {

  constructor(private http: HttpClient) {}

  searchPlayers(beginning: string): Observable<AdminCountryToAutocomplete[]> {
    return this.http.get<AdminCountryToAutocomplete[]>('/api/admin/countries/toAutocomplete', {
      params: new HttpParams().set('beginning', beginning)
    });
  }
}