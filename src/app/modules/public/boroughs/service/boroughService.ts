import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "src/app/shared/page";
import { Borough } from "../model/borough";

@Injectable({
  providedIn: 'root'
})
export class BoroughService {

  constructor(private http: HttpClient) { }

  getBoroughs(page: number, size: number): Observable<Page<Borough>> {
    return this.http.get<Page<Borough>>(`/api/boroughs?page=${page}&size=${size}`);
  }

  getBoroughBySlug(slug: string): Observable<Borough> {
    return this.http.get<Borough>(`/api/boroughs/${slug}`);
  }
}