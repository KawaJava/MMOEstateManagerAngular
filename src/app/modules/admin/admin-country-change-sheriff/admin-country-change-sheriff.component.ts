import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormPlayerService } from '../admin-country-add/form-player.service';
import { AdminCountryService } from '../admin-country/admin-country.service';
import { AdminPlayer } from '../admin-player/adminPlayer';

@Component({
  selector: 'app-admin-country-change-sheriff',
  templateUrl: './admin-country-change-sheriff.component.html',
  styleUrls: ['./admin-country-change-sheriff.component.scss']
})
export class AdminCountryChangeSheriffComponent implements OnInit {

  //country!: AdminCountryAdd;
  countryForm!: FormGroup;
  players: Array<AdminPlayer> = [];

  constructor(
    private router: ActivatedRoute,
    private adminCountryService: AdminCountryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private formPlayerService: FormPlayerService
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.countryForm = this.formBuilder.group({
      actualSheriffId: ['', [Validators.required]]
    });
  }
  submit() {
    let id = Number(this.router.snapshot.params['id']);
    let newSheriffId = this.countryForm.value.actualSheriffId;

    this.adminCountryService.changeSheriff(id, newSheriffId).subscribe({
      next: () => {
        this.snackBar.open("Szeryf został zmieniony", '', { duration: 3000 });
      },
      error: (err) => {
        console.error('Błąd podczas zmiany szeryfa:', err);
        this.snackBar.open("Wystąpił błąd przy zmianie szeryfa", '', { duration: 3000 });
      }
    });
  }

  getPlayers() {
    this.formPlayerService.getPlayers()
      .subscribe(players => this.players = players);
  }

}
