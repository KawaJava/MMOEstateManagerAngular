import { Component, OnInit } from '@angular/core';
import { AdminPlayer } from '../admin-player/model/adminPlayer';
import { AdminPlayerService } from '../admin-player/admin-player.service';

@Component({
  selector: 'app-admin-player-inactive',
  templateUrl: './admin-player-inactive.component.html',
  styleUrls: ['./admin-player-inactive.component.scss']
})
export class AdminPlayerInactiveComponent implements OnInit {

  displayedColumns: string[] = ["id", "name", "email", "slug", "clan", "created"];
  data: AdminPlayer[] = [];
  
  constructor(
    private adminPlayerService: AdminPlayerService
  ) { }

  ngOnInit(): void {
    this.getInactivePlayers();  
  }

  getInactivePlayers() {
    this.adminPlayerService.getInactivePlayers()
    .subscribe(data => this.data = data)
  }

}
