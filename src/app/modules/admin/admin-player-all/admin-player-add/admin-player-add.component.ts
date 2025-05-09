import { Component, OnInit } from '@angular/core';
import { AdminPlayerUpdate } from '../model/adminPlayerUpdate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminPlayerUpdateService } from '../admin-player-update/admin-player-update.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-player-add',
  templateUrl: './admin-player-add.component.html',
  styleUrls: ['./admin-player-add.component.scss']
})
export class AdminPlayerAddComponent implements OnInit {

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
    this.playerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      slug: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      clan: ['', [Validators.required, Validators.min(0)]],
    });
  }

  submit() {{
    this.adminPlayerUpdateService.createPlayer(this.playerForm.value)
    .subscribe(player => this.playerForm.setValue({
      id: null,
      name: player.name,
      slug: player.slug,
      email: player.email,
      clan: player.clan,
  }));
  this.snackBar.open("Gracz został dodany", '', {duration: 3000});
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
