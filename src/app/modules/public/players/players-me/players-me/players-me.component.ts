import { Component, OnInit } from '@angular/core';
import { PlayerDetails } from '../../model/playerDetails';
import { PlayerService } from '../../service/playerService';

@Component({
  selector: 'app-players-me',
  templateUrl: './players-me.component.html',
  styleUrls: ['./players-me.component.scss']
})
export class PlayersMeComponent implements OnInit {

  player!: PlayerDetails;
  loading = true;
  error = false;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getCurrentUser().subscribe({
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
