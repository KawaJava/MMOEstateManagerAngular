import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminPlayer } from '../model/adminPlayer';
import { AdminPlayerService } from '../service/admin-player.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map, startWith, switchMap } from 'rxjs';
import { AdminConfirmDialogService } from '../../admin-confirm-dialog.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-admin-player',
  templateUrl: './admin-player.component.html',
  styleUrls: ['./admin-player.component.scss']
})
export class AdminPlayerComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "name", "email", "slug", "clan", "isActive", "created", "actions"];
  totalElements: number = 0;
  data: AdminPlayer[] = [];

  constructor(
    private adminPlayerService: AdminPlayerService,
    private dialogService: AdminConfirmDialogService
  ) { }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminPlayerService.getPlayers(this.paginator.pageIndex, this.paginator.pageSize)
      }),
      map(data =>{
        this.totalElements = data.totalElements;
        return data.content;
      })
    ).subscribe(data => this.data = data)
  }

  confirmDelete(element: AdminPlayer) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć tego gracza?")
    .afterClosed()
    .subscribe(result => {
      if(result) {
        this.adminPlayerService.deletePlayer(element.id)
          .subscribe(() => {
            this.data.forEach((value, index) => {
              if(element == value) {
                this.data.splice(index, 1);
                this.table.renderRows();
              }
            })
          });
      }
    });
  }
  confirmDeactivation(element: AdminPlayer) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz dezaktywować tego gracza?")
    .afterClosed()
    .subscribe(result => {
      if(result) {
        this.adminPlayerService.deactivatePlayer(element.id)
          .subscribe(() => {
            this.data.forEach((value, index) => {
              if(element == value) {
                this.data.splice(index, 1);
                this.table.renderRows();
              }
            })
          });
      }
    });
  }
}
