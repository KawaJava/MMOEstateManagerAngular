import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminCountry } from './model/adminCountry';
import { MatPaginator } from '@angular/material/paginator';
import { AdminCountryService } from './admin-country.service';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';
import { MatTable } from '@angular/material/table';
import { map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-country',
  templateUrl: './admin-country.component.html',
  styleUrls: ['./admin-country.component.scss']
})
export class AdminCountryComponent implements AfterViewInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "name", "slug", "actualSheriffId", "goldLimit", "sheriffStartDate", "actions"];
  totalElements: number = 0;
  data: AdminCountry[] = [];

  constructor(
    private adminCountryService: AdminCountryService,
    private dialogService: AdminConfirmDialogService) { }

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

}
