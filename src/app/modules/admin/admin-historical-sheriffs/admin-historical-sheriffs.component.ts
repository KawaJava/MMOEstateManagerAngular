import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminHistoricalSheriff } from './model/adminHistoricalSheriff';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';
import { AdminHistoricalSheriffsService } from './admin-historical-sheriffs.service';
import { startWith, switchMap, map, of } from 'rxjs';
import { FormPlayerService } from '../admin-country-add/form-player.service';
import { AdminPlayer } from '../admin-player/model/adminPlayer';
import { AdminCountry } from '../admin-country/model/adminCountry';
import { AdminHistoricalSheriffsFilteredService } from '../admin-historical-sheriffs-filtered/admin-historical-sheriffs-filtered.service';

@Component({
  selector: 'app-admin-historical-sheriffs',
  templateUrl: './admin-historical-sheriffs.component.html',
  styleUrls: ['./admin-historical-sheriffs.component.scss']
})
export class AdminHistoricalSheriffsComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "countryId", "playerId", "startDate", "endDate"];
  totalElements: number = 0;
  data: AdminHistoricalSheriff[] = [];
  players: Array<AdminPlayer> = [];
  countries :Array<AdminCountry> = [];
  playerMap: Map<number, string> = new Map();
  countryMap: Map<number, string> = new Map();
  
  constructor(
    private adminHistoricalSheriffsService: AdminHistoricalSheriffsService,
    private dialogService: AdminConfirmDialogService,
    private formPlayerService: FormPlayerService,
    private adminHistoricalSheriffsFilteredService: AdminHistoricalSheriffsFilteredService
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.getCountries();
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminHistoricalSheriffsService.getHistoricalSheriffs(this.paginator.pageIndex, this.paginator.pageSize)
      }),
      map(data =>{
        this.totalElements = data.totalElements;
        return data.content;
      })
    ).subscribe(data => this.data = data)
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
