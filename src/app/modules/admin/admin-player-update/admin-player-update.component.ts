import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPlayerUpdateService } from './admin-player-update.service';
import { AdminPlayerUpdate } from './model/AdminPlayerUpdate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-player-update',
  templateUrl: './admin-player-update.component.html',
  styleUrls: ['./admin-player-update.component.scss']
})
export class AdminPlayerUpdateComponent implements OnInit {

  player!: AdminPlayerUpdate;
  playerForm!: FormGroup;
  clans: string[] = ['Clan1', 'Clan2', 'Clan3', `Clan4`];

  constructor(
    private router: ActivatedRoute,
    private adminPlayerUpdateService: AdminPlayerUpdateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPlayer();

    this.playerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      slug: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      clan: ['', [Validators.required, Validators.min(0)]],
    });
  }

  getPlayer() {
    let id = Number (this.router.snapshot.params['id']);
    this.adminPlayerUpdateService.getPlayer(id)
    .subscribe(player => this.playerForm.setValue({
      name: player.name,
      slug: player.slug,
      email: player.email,
      clan: player.clan,
  }));
  }

  submit() {{
    let id = Number (this.router.snapshot.params['id']);
    this.adminPlayerUpdateService.savePlayer(id, this.playerForm.value)
    .subscribe(player => this.playerForm.setValue({
      name: player.name,
      slug: player.slug,
      email: player.email,
      clan: player.clan,
  }));
  this.snackBar.open("Gracz został zaktualizowany", '', {duration: 3000});
  }}

  get name() {
    return this.playerForm.get("name");
  }

  get slug() {
    return this.playerForm.get("slug");
  }

  get email() {
    return this.playerForm.get("email");
  }
  get clan() {
    return this.playerForm.get("clan");
  }
}