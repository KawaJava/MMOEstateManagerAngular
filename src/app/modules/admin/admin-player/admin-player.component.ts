import { Component, OnInit } from '@angular/core';
import { AdminPlayer } from './adminPlayer';
import { AdminPlayerService } from './admin-player.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-player',
  templateUrl: './admin-player.component.html',
  styleUrls: ['./admin-player.component.scss']
})
export class AdminPlayerComponent implements OnInit {

  dataSource: AdminPlayer[] = [];
  displayedColumns: string[] = ["id", "name", "email", "slug", "clan", "isActive", "created"];

  constructor(
    // private adminPlayerService: AdminPlayerService
  ) { }

  ngOnInit(): void {
    //this.getPlayers();  
  }

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
