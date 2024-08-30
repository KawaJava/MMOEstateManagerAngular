import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminBorough } from './model/adminBorough';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AdminBoroughService } from './admin-borough.service';
import { startWith, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-admin-borough',
  templateUrl: './admin-borough.component.html',
  styleUrls: ['./admin-borough.component.scss']
})
export class AdminBoroughComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "name", "slug", "countryId", "actualLeaderId", "leaderStartDate", "actualGold", "goldAddedBy",
    "dateAdded", "emailSend","actions"];
  totalElements: number = 0;
  data: AdminBorough[] = [];

  constructor(private adminBoroughService: AdminBoroughService) { }

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

}
