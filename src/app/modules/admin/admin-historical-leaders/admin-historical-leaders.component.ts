import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminHistoricalLeader } from './model/adminHistoricalLeader';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';
import { AdminHistoricalLeadersService } from './admin-historical-leaders.service';
import { startWith, switchMap, map, of } from 'rxjs';
import { AdminBorough } from '../admin-borough-all/model/adminBorough';
import { AdminPlayer } from '../admin-player/model/adminPlayer';
import { FormPlayerService } from '../admin-country-all/model/form-player.service';
import { AdminHistoricalLeadersFilteredService } from '../admin-historical-leaders-filtered/admin-historical-leaders-filtered.service';
import { AdminBoroughService } from '../admin-borough-all/service/admin-borough.service';

@Component({
  selector: 'app-admin-historical-leaders',
  templateUrl: './admin-historical-leaders.component.html',
  styleUrls: ['./admin-historical-leaders.component.scss']
})
export class AdminHistoricalLeadersComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "boroughId", "playerId", "startDate", "endDate"];
  totalElements: number = 0;
  data: AdminHistoricalLeader[] = [];
  players: Array<AdminPlayer> = [];
  boroughs: Array<AdminBorough> = [];
  playerMap: Map<number, string> = new Map();
  boroughMap: Map<number, string> = new Map();
  
  constructor(
    private adminHistoricalLeadersService: AdminHistoricalLeadersService,
    private dialogService: AdminConfirmDialogService,
    private adminBoroughService: AdminBoroughService,
    private formPlayerService: FormPlayerService,
    private adminHistoricalLeadersFilteredService: AdminHistoricalLeadersFilteredService
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.getBoroughs();
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminHistoricalLeadersService.getHistoricalLeaders(this.paginator.pageIndex, this.paginator.pageSize)
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

  getBoroughs() {
    this.adminHistoricalLeadersFilteredService.getBoroughs()
      .pipe(
        switchMap(boroughs => {
          this.boroughs = boroughs;
          return of(this.setBoroughMap(boroughs));
        })
      )
      .subscribe(boroughMap => {
        this.boroughMap = boroughMap;
      });
  }

  setPlayerMap(players: AdminPlayer[]): Map<number, string> {
    return new Map(players.map(player => [player.id, player.name]));
  }

  setBoroughMap(boroughs: AdminBorough[]): Map<number, string> {
    return new Map(boroughs.map(borough => [borough.id, borough.name]));
  }

}
