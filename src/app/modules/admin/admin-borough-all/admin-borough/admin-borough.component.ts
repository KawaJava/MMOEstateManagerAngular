import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminBorough } from '../model/adminBorough';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { startWith, switchMap, map, of } from 'rxjs';
import { AdminCountry } from '../../admin-country/model/adminCountry';
import { AdminPlayer } from '../../admin-player/model/adminPlayer';
import { FormPlayerService } from '../../admin-country-add/form-player.service';
import { AdminHistoricalSheriffsFilteredService } from '../../admin-historical-sheriffs-filtered/admin-historical-sheriffs-filtered.service';
import { AdminBoroughService } from '../service/admin-borough.service';

@Component({
  selector: 'app-admin-borough',
  templateUrl: './admin-borough.component.html',
  styleUrls: ['./admin-borough.component.scss']
})
export class AdminBoroughComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "name", "slug", "countryId", "actualLeaderId", "leaderStartDate", "actualGold", "goldAddedBy",
    "dateAdded", "emailSend","actions"];
  totalElements: number = 0;
  data: AdminBorough[] = [];
  players: Array<AdminPlayer> = [];
  countries: Array<AdminCountry> = [];
  playerMap: Map<number, string> = new Map();
  countryMap: Map<number, string> = new Map();

  constructor(private adminBoroughService: AdminBoroughService,
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
        return this.adminBoroughService.getBoroughs(this.paginator.pageIndex, this.paginator.pageSize)
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
