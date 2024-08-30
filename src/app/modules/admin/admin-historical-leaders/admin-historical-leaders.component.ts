import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminHistoricalLeader } from './model/adminHistoricalLeader';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';
import { AdminHistoricalLeadersService } from './admin-historical-leaders.service';
import { startWith, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-admin-historical-leaders',
  templateUrl: './admin-historical-leaders.component.html',
  styleUrls: ['./admin-historical-leaders.component.scss']
})
export class AdminHistoricalLeadersComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "boroughId", "playerId", "startDate", "endDate"];
  totalElements: number = 0;
  data: AdminHistoricalLeader[] = [];
  
  constructor(
    private adminHistoricalLeadersService: AdminHistoricalLeadersService,
    private dialogService: AdminConfirmDialogService
  ) { }

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

}
