import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  players: string[] = ['Gracz1', 'Gracz2'];

  constructor() { }

  ngOnInit(): void {
  }

}
