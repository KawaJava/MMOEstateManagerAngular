import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminGoldHistory } from './model/adminGoldHistory';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';
import { AdminGoldHistoryService } from './admin-gold-history.service';
import { startWith, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-admin-gold-history',
  templateUrl: './admin-gold-history.component.html',
  styleUrls: ['./admin-gold-history.component.scss']
})
export class AdminGoldHistoryComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "boroughId", "gold", "goldAddedby", "dateAdded", "emailSend"];
  totalElements: number = 0;
  data: AdminGoldHistory[] = [];
  
  constructor(
    private adminGoldHistoryService: AdminGoldHistoryService,
    private dialogService: AdminConfirmDialogService
  ) { }

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

}
