import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { startWith, switchMap, map, of } from 'rxjs';
import { AdminConfirmDialogService } from '../../admin-confirm-dialog.service';
import { AdminPlayer } from '../../admin-player-all/model/adminPlayer';
import { AdminCountry } from '../model/adminCountry';
import { FormPlayerService } from '../model/form-player.service';
import { AdminCountryService } from '../service/admin-country.service';


@Component({
  selector: 'app-admin-country',
  templateUrl: './admin-country.component.html',
  styleUrls: ['./admin-country.component.scss']
})
export class AdminCountryComponent implements AfterViewInit, OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "name", "slug", "actualSheriffId", "goldLimit", "sheriffStartDate", "actions"];
  totalElements: number = 0;
  data: AdminCountry[] = [];
  players: Array<AdminPlayer> = [];
  playerMap: Map<number, string> = new Map();

  constructor(
    private adminCountryService: AdminCountryService,
    private dialogService: AdminConfirmDialogService,
    private formPlayerService: FormPlayerService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminCountryService.getCountries(this.paginator.pageIndex, this.paginator.pageSize)
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

  setPlayerMap(players: AdminPlayer[]): Map<number, string> {
    return new Map(players.map(player => [player.id, player.name]));
  }
}
