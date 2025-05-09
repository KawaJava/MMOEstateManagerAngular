import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormPlayerService } from '../../admin-country-all/model/form-player.service';
import { AdminPlayer } from '../../admin-player/model/adminPlayer';
import { AdminBoroughAddService } from '../service/admin-borough-add.service';

@Component({
  selector: 'app-admin-borough-change-leader',
  templateUrl: './admin-borough-change-leader.component.html',
  styleUrls: ['./admin-borough-change-leader.component.scss']
})
export class AdminBoroughChangeLeaderComponent implements OnInit {

  boroughForm!: FormGroup;
  players: Array<AdminPlayer> = [];

  constructor(
    private router: ActivatedRoute,
    private adminBoroughService: AdminBoroughAddService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private formPlayerService: FormPlayerService
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.boroughForm = this.formBuilder.group({
      actualLeaderId: ['', [Validators.required]]
    });
  }
  submit() {
    let id = Number(this.router.snapshot.params['id']);
    let newLeaderId = this.boroughForm.value.actualLeaderId;

    this.adminBoroughService.changeLeader(id, newLeaderId).subscribe({
      next: () => {
        this.snackBar.open("Wójt został zmieniony", '', { duration: 3000 });
      },
      error: (err) => {
        console.error('Błąd podczas zmiany wójta:', err);
        this.snackBar.open("Wystąpił błąd przy zmianie wójta", '', { duration: 3000 });
      }
    });
  }

  getPlayers() {
    this.formPlayerService.getPlayers()
      .subscribe(players => this.players = players);
  }

  get leader() {
    return this.boroughForm.get("actualLeaderId");
  }
}
