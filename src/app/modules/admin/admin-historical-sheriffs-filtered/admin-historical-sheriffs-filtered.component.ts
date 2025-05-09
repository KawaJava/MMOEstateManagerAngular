import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AdminHistoricalSheriff } from '../admin-historical-sheriffs/model/adminHistoricalSheriff';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormPlayerService } from '../admin-country-all/model/form-player.service';
import { AdminPlayer } from '../admin-player/model/adminPlayer';
import { AdminHistoricalSheriffsFilteredService } from './admin-historical-sheriffs-filtered.service';
import { HistoricalSheriffsFilteredDto } from '../admin-historical-sheriffs/model/historicalSheriffsFilteredDto';
import { switchMap, of } from 'rxjs';
import { AdminCountry } from '../admin-country-all/model/adminCountry';

@Component({
  selector: 'app-admin-historical-sheriffs-filtered',
  templateUrl: './admin-historical-sheriffs-filtered.component.html',
  styleUrls: ['./admin-historical-sheriffs-filtered.component.scss']
})
export class AdminHistoricalSheriffsFilteredComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "countryId", "playerId", "startDate", "endDate"];
  totalElements: number = 0;
  data: AdminHistoricalSheriff[] = [];
  historicalSheriffsFilteredDto!: HistoricalSheriffsFilteredDto;

  sheriff!: AdminHistoricalSheriff;
  dataForm!: FormGroup;
  players: Array<AdminPlayer> = [];
  countries: Array<AdminCountry> = [];
  playerMap: Map<number, string> = new Map();
  countryMap: Map<number, string> = new Map();
  
  constructor(
    private formPlayerService: FormPlayerService,
    private adminHistoricalSheriffsFilteredService: AdminHistoricalSheriffsFilteredService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.getCountries();
    this.dataForm = this.formBuilder.group({
      country: [''],
      player: [''],
      from: [''],
      to: [''],
    });
  }

  submit() {
    const formValue = this.dataForm.value;
    const dto: HistoricalSheriffsFilteredDto = {
      countryId: formValue.country,
      playerId: formValue.player,
      startDate: formValue.from,
      endDate: formValue.to
    };
    this.adminHistoricalSheriffsFilteredService.getFilteredData(dto)
      .subscribe(data => this.data = data);
  }

  getPlayers() {
    this.formPlayerService.getPlayers()
      .pipe(
        switchMap(players => {
          this.players = players;
          return of(this.setPlayerMap(players));
        })
      )
      .subscribe(playerMap => {
        this.playerMap = playerMap;
      });
  }

  getCountries() {
    this.adminHistoricalSheriffsFilteredService.getCountries()
      .pipe(
        switchMap(countries => {
          this.countries = countries;
          return of(this.setCountryMap(countries));
        })
      )
      .subscribe(countryMap => {
        this.countryMap = countryMap;
      });
  }

  setPlayerMap(players: AdminPlayer[]): Map<number, string> {
    return new Map(players.map(player => [player.id, player.name]));
  }

  setCountryMap(countries: AdminCountry[]): Map<number, string> {
    return new Map(countries.map(country => [country.id, country.name]));
  }

}
