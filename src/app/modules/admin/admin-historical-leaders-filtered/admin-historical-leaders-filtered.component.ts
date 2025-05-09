import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminHistoricalLeader } from '../admin-historical-leaders/model/adminHistoricalLeader';
import { HistoricalLeadersFilteredDto } from '../admin-historical-leaders/model/historicalLeadersFilteredDto';
import { AdminBorough } from '../admin-borough-all/model/adminBorough';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { FormPlayerService } from '../admin-country-all/model/form-player.service';
import { AdminPlayer } from '../admin-player-all/model/adminPlayer';
import { AdminHistoricalLeadersFilteredService } from './admin-historical-leaders-filtered.service';
import { switchMap, of } from 'rxjs';

@Component({
  selector: 'app-admin-historical-leaders-filtered',
  templateUrl: './admin-historical-leaders-filtered.component.html',
  styleUrls: ['./admin-historical-leaders-filtered.component.scss']
})
export class AdminHistoricalLeadersFilteredComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "boroughId", "playerId", "startDate", "endDate"];
  totalElements: number = 0;
  data: AdminHistoricalLeader[] = [];
  historicalLeadersFilteredDto!: HistoricalLeadersFilteredDto;

  leader!: AdminHistoricalLeader;
  dataForm!: FormGroup;
  players: Array<AdminPlayer> = [];
  boroughs: Array<AdminBorough> = [];
  
  playerMap: Map<number, string> = new Map();
  boroughMap: Map<number, string> = new Map();
  
  constructor(
    private formPlayerService: FormPlayerService,
    private adminHistoricalLeadersFilteredService: AdminHistoricalLeadersFilteredService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.getBoroughs();
    this.dataForm = this.formBuilder.group({
      borough: [''],
      player: [''],
      from: [''],
      to: [''],
    });
  }

  submit() {
    const formValue = this.dataForm.value;
    const dto: HistoricalLeadersFilteredDto = {
      boroughId: formValue.borough,
      playerId: formValue.player,
      startDate: formValue.from,
      endDate: formValue.to
    };
    this.adminHistoricalLeadersFilteredService.getFilteredData(dto)
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
