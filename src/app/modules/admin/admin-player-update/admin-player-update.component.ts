import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPlayerUpdateService } from './admin-player-update.service';
import { AdminPlayerUpdate } from './model/AdminPlayerUpdate';

@Component({
  selector: 'app-admin-player-update',
  templateUrl: './admin-player-update.component.html',
  styleUrls: ['./admin-player-update.component.scss']
})
export class AdminPlayerUpdateComponent implements OnInit {

  player!: AdminPlayerUpdate;

  constructor(
    private router: ActivatedRoute,
    private adminPlayerUpdateService: AdminPlayerUpdateService
  ) { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer() {
    let id = Number (this.router.snapshot.params['id']);
    this.adminPlayerUpdateService.getPlayer(id)
    .subscribe(player => this.player = player);
  }

}
