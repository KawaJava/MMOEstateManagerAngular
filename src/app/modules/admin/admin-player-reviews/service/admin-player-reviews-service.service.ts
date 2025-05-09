import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/page';
import { AdminPlayerReview } from '../model/adminPlayerReview';

@Injectable({
  providedIn: 'root'
})
export class AdminPlayerReviewsService {

  constructor(private http: HttpClient) {}

  getReviews(page: number, size: number): Observable<Page<AdminPlayerReview>> {
    return this.http.get<Page<AdminPlayerReview>>(`/api/admin/player-reviews?page=${page}&size=${size}`
    );
  }
  deletePlayerReview(id: number): Observable<void> {
    return this.http.delete<void>(`/api/admin/player-reviews/`+ id);
  }
}
