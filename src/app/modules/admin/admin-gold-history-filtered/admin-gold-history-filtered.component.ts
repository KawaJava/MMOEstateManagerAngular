import { Component, OnInit, ViewChild } from '@angular/core';
import { GoldHistoryFilteredDto } from '../admin-gold-history/model/goldHistoryFilteredDto';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { AdminBorough } from '../admin-borough-all/model/adminBorough';
import { FormPlayerService } from '../admin-country-all/model/form-player.service';
import { AdminHistoricalLeadersFilteredService } from '../admin-historical-leaders-filtered/admin-historical-leaders-filtered.service';
import { AdminHistoricalLeader } from '../admin-historical-leaders/model/adminHistoricalLeader';
import { AdminPlayer } from '../admin-player-all/model/adminPlayer';
import { AdminGoldHistoryFilteredService } from './admin-gold-history-filtered.service';
import { AdminGoldHistory } from '../admin-gold-history/model/adminGoldHistory';
import { switchMap, of } from 'rxjs';

@Component({
  selector: 'app-admin-gold-history-filtered',
  templateUrl: './admin-gold-history-filtered.component.html',
  styleUrls: ['./admin-gold-history-filtered.component.scss']
})
export class AdminGoldHistoryFilteredComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "boroughId", "gold", "goldAddedBy", "dateAdded", "emailSend"];
  totalElements: number = 0;
  data: AdminGoldHistory[] = [];
  goldHistoryFilteredDto!: GoldHistoryFilteredDto;

  leader!: AdminHistoricalLeader;
  dataForm!: FormGroup;
  boroughs: Array<AdminBorough> = [];
  playerMap: Map<number, string> = new Map();
  boroughMap: Map<number, string> = new Map();

  players: Array<AdminPlayer> = [];

  constructor(
    private formPlayerService: FormPlayerService,
    private adminHistoricalLeadersFilteredService: AdminHistoricalLeadersFilteredService,
    private adminGoldHistoryFilteredService: AdminGoldHistoryFilteredService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getBoroughs();
    this.getPlayers();
    this.dataForm = this.formBuilder.group({
      borough: [''],
      goldAddedBy: [''],
      emailSend: [''],
      startDate: [''],
      endDate: [''],
    });
  }
  get goldAddedBy(): FormControl {
    return this.dataForm.get('goldAddedBy') as FormControl;
  }
  get borough(): FormControl {
    return this.dataForm.get('borough') as FormControl;
  }



  submit() {
    const formValue = this.dataForm.value;
    const dto: GoldHistoryFilteredDto = {
      boroughId: formValue.borough?.id ?? null,
      goldAddedBy: formValue.goldAddedBy,
      emailSend: formValue.emailSend,
      startDate: formValue.startDate,
      endDate: formValue.endDate
    };
    this.adminGoldHistoryFilteredService.getFilteredData(dto)
      .subscribe(data => this.data = data);
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
}
