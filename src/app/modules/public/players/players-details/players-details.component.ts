import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../model/player';
import { PlayerService } from '../service/playerService';
import { Location } from '@angular/common';

@Component({
  selector: 'app-players-details',
  templateUrl: './players-details.component.html',
  styleUrls: ['./players-details.component.scss']
})
export class PlayersDetailsComponent implements OnInit {

  player!: Player;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location
  ) {}

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
  }
  goBack(): void {
    this.location.back();
  }

}
