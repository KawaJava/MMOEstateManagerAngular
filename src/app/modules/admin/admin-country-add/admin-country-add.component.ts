import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminCountryAdd } from '../admin-country/model/adminCountryAdd';
import { AdminCountryService } from '../admin-country/admin-country.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminPlayer } from '../admin-player/model/adminPlayer';
import { FormPlayerService } from './form-player.service';

@Component({
  selector: 'app-admin-country-add',
  templateUrl: './admin-country-add.component.html',
  styleUrls: ['./admin-country-add.component.scss']
})
export class AdminCountryAddComponent implements OnInit {

  country!: AdminCountryAdd;
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
    console.log('Player Map:', this.players);
    this.countryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', [Validators.required, Validators.minLength(3)]],
      actualSheriffId: ['', [Validators.required]],
      goldLimit: ['', [Validators.min(0)]],
    });
  }

  submit() {{
    this.adminCountryService.createCountry(this.countryForm.value)
    .subscribe(country => this.countryForm.setValue({
      name: country.name,
      slug: country.slug,
      actualSheriffId: country.actualSheriffId,
      goldLimit: country.goldLimit,
  }));
  this.snackBar.open("Hrabstwo zostało dodane", '', {duration: 3000});
  }}

  getPlayers() {
    this.formPlayerService.getPlayers()
      .subscribe(players => this.players = players);
  }
  
  get name() {
    return this.countryForm.get("name");
  }

  get slug() {
    return this.countryForm.get("slug");
  }

  get sheriff() {
    return this.countryForm.get("actualSheriffId");
  }

  get goldLimit() {
    return this.countryForm.get("goldLimit");
  }
}
