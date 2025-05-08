import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerReview } from '../model/playerReview';
import { PlayerReviewDTO } from '../../players/model/playerReviewDTO';

@Injectable({
  providedIn: 'root'
})
export class PlayerReviewService {
  

  constructor(private http: HttpClient) {}

  getReviews(playerId: number, page = 0, size = 10): Observable<PlayerReview[]> {
    return this.http.get<PlayerReview[]>(`/api/players/${playerId}/reviews?page=${page}&size=${size}`);
  }

  addReview(reviewDto: PlayerReviewDTO): Observable<PlayerReviewDTO> {
    return this.http.post<PlayerReviewDTO>(`/api/players/${reviewDto.playerId}/add-review`, reviewDto);
    }
}
