import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AdminHistoricalSheriff } from '../admin-historical-sheriffs/model/adminHistoricalSheriff';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormPlayerService } from '../admin-country-add/form-player.service';
import { AdminPlayer } from '../admin-player/adminPlayer';
import { AdminCountry } from '../admin-country/model/adminCountry';
import { AdminHistoricalSheriffsFilteredService } from './admin-historical-sheriffs-filtered.service';
import { HistoricalSheriffsFilteredDto } from './model/historicalSheriffsFilteredDto';

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
      .subscribe(players => this.players = players);
  }

  getCountries() {
    this.adminHistoricalSheriffsFilteredService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

}
