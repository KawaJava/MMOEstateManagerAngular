import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminPlayer } from './adminPlayer';
import { AdminPlayerService } from './admin-player.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-player',
  templateUrl: './admin-player.component.html',
  styleUrls: ['./admin-player.component.scss']
})
export class AdminPlayerComponent implements AfterViewInit {

  //dataSource: AdminPlayer[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ["id", "name", "email", "slug", "clan", "isActive", "created", "actions"];
  totalElements: number = 0;
  data: AdminPlayer[] = [];

  constructor(
    private adminPlayerService: AdminPlayerService
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
    ).subscribe(data =>this.data = data)
  }

  // ngOnInit(): void {
  //   this.getPlayers();  
  // }

  // getPlayers() {
  //   this.adminPlayerService.getPlayers(0, 25)
  //   .subscribe(page => this.dataSource = page.content)
  // }

  // getPlayers() {
  //   this.getPlayerPage(0, 10);
  // }
  
  // onPageEvent(event: PageEvent){
  //   this.getPlayerPage(event.pageIndex, event.pageSize);
  // }
  
  // private getPlayerPage(page: number, size: number) {
  //   this.adminPlayerService.getPlayers(page, size)
  //     .subscribe(page => this.dataSource = page.content);
  // }

}
