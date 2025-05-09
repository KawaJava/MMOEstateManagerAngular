import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminGoldHistory } from './model/adminGoldHistory';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';
import { AdminGoldHistoryService } from './admin-gold-history.service';
import { startWith, switchMap, map, of } from 'rxjs';
import { AdminBorough } from '../admin-borough-all/model/adminBorough';
import { FormPlayerService } from '../admin-country-add/form-player.service';
import { AdminHistoricalLeadersFilteredService } from '../admin-historical-leaders-filtered/admin-historical-leaders-filtered.service';
import { AdminPlayer } from '../admin-player/model/adminPlayer';

@Component({
  selector: 'app-admin-gold-history',
  templateUrl: './admin-gold-history.component.html',
  styleUrls: ['./admin-gold-history.component.scss']
})
export class AdminGoldHistoryComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "boroughId", "gold", "goldAddedBy", "dateAdded", "emailSend"];
  totalElements: number = 0;
  data: AdminGoldHistory[] = [];
  players: Array<AdminPlayer> = [];
  boroughs: Array<AdminBorough> = [];
  playerMap: Map<number, string> = new Map();
  boroughMap: Map<number, string> = new Map();
  
  constructor(
    private adminGoldHistoryService: AdminGoldHistoryService,
    private dialogService: AdminConfirmDialogService,
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
        return this.adminGoldHistoryService.getGoldHistory(this.paginator.pageIndex, this.paginator.pageSize)
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
