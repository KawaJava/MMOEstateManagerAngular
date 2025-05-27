import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminBoroughAddService } from '../service/admin-borough-add.service';
import { AdminBoroughAdd } from '../model/adminBoroughAdd';
import { FormPlayerService } from '../../admin-country-all/model/form-player.service';
import { AdminHistoricalSheriffsFilteredService } from '../../admin-historical-sheriffs-filtered/admin-historical-sheriffs-filtered.service';
import { AdminPlayer } from '../../admin-player-all/model/adminPlayer';
import { AdminCountry } from '../../admin-country-all/model/adminCountry';
import { AdminplayerToAutocompleteService } from 'src/app/modules/common/service/AdminplayerToAutocompleteService';
import { AdminPlayerToAutocomplete } from '../../admin-register/model/adminPlayerToAutoComplete';

@Component({
  selector: 'app-admin-borough-add',
  templateUrl: './admin-borough-add.component.html',
  styleUrls: ['./admin-borough-add.component.scss']
})
export class AdminBoroughAddComponent implements OnInit {

  borough!: AdminBoroughAdd;
  boroughForm!: FormGroup;
  players: Array<AdminPlayer> = [];
  countries: Array<AdminCountry> = [];
  filteredPlayers: AdminPlayerToAutocomplete[] = [];

  constructor(
    private router: ActivatedRoute,
    private adminBoroughAddService: AdminBoroughAddService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private playerService: AdminplayerToAutocompleteService,
    private adminHistoricalSheriffsFilteredService: AdminHistoricalSheriffsFilteredService,
  ) { }

  ngOnInit(): void {
    this.getCountries();

    this.boroughForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', [Validators.required, Validators.minLength(3)]],
      countryId: ['', [Validators.required]],
      actualLeaderId: ['', [Validators.required]],
      leaderStartDate: ['', [Validators.required]],
      actualGold: ['', [Validators.required, Validators.min(1000)]],
      goldAddedBy: ['', [Validators.required]]
    });
  }

  getCountries() {
    this.adminHistoricalSheriffsFilteredService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  submit() {
    {
      this.adminBoroughAddService.createBorough(this.boroughForm.value)
        .subscribe(borough => this.boroughForm.setValue({
          name: borough.name,
          slug: borough.slug,
          countryId: borough.countryId,
          actualLeaderId: borough.actualLeaderId,
          leaderStartDate: borough.leaderStartDate,
          actualGold: borough.actualGold,
          goldAddedBy: borough.goldAddedBy
        }));
      this.snackBar.open("Gmina została dodana", '', { duration: 3000 });
    }
  }

  onSearchPlayer(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    if (input.length >= 1) {
      this.playerService.searchPlayers(input).subscribe({
        next: players => {
          this.filteredPlayers = players;
        },
        error: err => {
          this.filteredPlayers = [];
        }
      });
    } else {
      this.filteredPlayers = [];
    }
  }

  get name() {
    return this.boroughForm.get("name");
  }

  get slug() {
    return this.boroughForm.get("slug");
  }

  get country() {
    return this.boroughForm.get("countryId");
  }

  get actualLeaderId() {
    return this.boroughForm.get('actualLeaderId') as FormControl;
  }

  get leaderStartDate() {
    return this.boroughForm.get("leaderStartDate");
  }

  get actualGold() {
    return this.boroughForm.get("actualGold");
  }

  get goldAddedBy() {
    return this.boroughForm.get("goldAddedBy") as FormControl;
  }
  displayPlayerName = (id: number): string => {
    const match = this.filteredPlayers.find(player => player.id === id);
    return match ? match.name : '';
  };

  get playerIdControl(): FormControl {
    return this.boroughForm.get('playerIdControl') as FormControl;
  }
}
