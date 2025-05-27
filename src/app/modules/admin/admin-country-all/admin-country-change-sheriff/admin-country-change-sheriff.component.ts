import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormPlayerService } from '../model/form-player.service';
import { AdminPlayer } from '../../admin-player-all/model/adminPlayer';
import { AdminCountryService } from '../service/admin-country.service';

@Component({
  selector: 'app-admin-country-change-sheriff',
  templateUrl: './admin-country-change-sheriff.component.html',
  styleUrls: ['./admin-country-change-sheriff.component.scss']
})
export class AdminCountryChangeSheriffComponent implements OnInit {

  countryForm!: FormGroup;
  players: Array<AdminPlayer> = [];

  constructor(
    private router: ActivatedRoute,
    private adminCountryService: AdminCountryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
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

  get sheriff(): FormControl {
  return this.countryForm.get("actualSheriffId") as FormControl;
}

}
