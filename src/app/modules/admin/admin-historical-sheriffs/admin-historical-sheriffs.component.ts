import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminHistoricalSheriff } from './model/adminHistoricalSheriff';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';
import { AdminHistoricalSheriffsService } from './admin-historical-sheriffs.service';
import { startWith, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-admin-historical-sheriffs',
  templateUrl: './admin-historical-sheriffs.component.html',
  styleUrls: ['./admin-historical-sheriffs.component.scss']
})
export class AdminHistoricalSheriffsComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "countryId", "playerId", "startDate", "endDate"];
  totalElements: number = 0;
  data: AdminHistoricalSheriff[] = [];
  
  constructor(
    private adminHistoricalSheriffsService: AdminHistoricalSheriffsService,
    private dialogService: AdminConfirmDialogService
  ) { }

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

}
