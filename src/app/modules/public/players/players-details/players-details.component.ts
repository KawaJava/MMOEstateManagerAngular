import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../model/player';
import { PlayerService } from '../service/playerService';
import { Location } from '@angular/common';
import { PlayerReview } from '../../playerReviews/model/playerReview';
import { PlayerReviewService } from '../../playerReviews/service/playerReviewService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerReviewDTO } from '../model/playerReviewDTO';

@Component({
  selector: 'app-players-details',
  templateUrl: './players-details.component.html',
  styleUrls: ['./players-details.component.scss']
})
export class PlayersDetailsComponent implements OnInit {

  player!: Player;
  loading = true;
  error = false;

  reviews: PlayerReview[] = [];
  isLoadingReviews = false;
  reviewError = false;

  currentPage = 0;
  pageSize = 10;
  hasMoreReviews = true;

  reviewForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location,
    private reviewService: PlayerReviewService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.playerService.getPlayerBySlug(slug).subscribe({
        next: (player) => {
          this.player = player;
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
    }

    this.reviewForm = this.fb.group({
      authorName: ['', [Validators.required, Validators.maxLength(60)]],
      note: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      content: ['', [Validators.required, Validators.maxLength(600)]]
    });
  }
  loadReviews(playerId: number, nextPage: boolean = false): void {
    if (this.isLoadingReviews || (!this.hasMoreReviews && nextPage)) return;

    this.isLoadingReviews = true;
    this.reviewError = false;

    const pageToLoad = nextPage ? this.currentPage + 1 : this.currentPage;

    this.reviewService.getReviews(playerId, pageToLoad, this.pageSize).subscribe({
      next: (data) => {
        if (data.length < this.pageSize) {
          this.hasMoreReviews = false;
        }

        if (nextPage) {
          this.reviews = [...this.reviews, ...data];
          this.currentPage++;
        } else {
          this.reviews = data;
          this.currentPage = 0;
          this.hasMoreReviews = true;
        }

        this.isLoadingReviews = false;
      },
      error: () => {
        this.reviewError = true;
        this.isLoadingReviews = false;
      }
    });
  }
  setRating(star: number): void {
    this.reviewForm.get('note')?.setValue(star);
  }
  
  submitReview(): void {
    if (this.reviewForm.invalid || !this.player?.id) return;
  
    const dto: PlayerReviewDTO = {
      ...this.reviewForm.value,
      playerId: this.player.id
    };
  
    this.reviewService.addReview(dto).subscribe({
      next: () => {
        this.reviewForm.reset();
        this.reviews = [];
        this.currentPage = 0;
        this.hasMoreReviews = true;
        this.loadReviews(this.player.id);
      },
      error: () => {
      }
    });
  }
}